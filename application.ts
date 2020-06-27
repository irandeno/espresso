import { serve } from "https://deno.land/std@v0.50.0/http/server.ts";
import { Context } from "./context.ts";
import { Router } from "./router/router.ts";
import { Middleware } from "./middlewares/middleware.ts";
import { Route } from "./router/route.ts";

type ServerConfig = {
  port?: number;
  log?: boolean;
};

export class Application {
  private log: boolean;
  private port: number = 3000;
  private server: any;
  private router: any;
  private middlewares: Middleware[] = [];
  constructor(serverConfig?: ServerConfig) {
    this.port = serverConfig?.port || 80;
    this.log = serverConfig?.log || true;
    this.router = new Router();
  }

  start(port: number = this.port) {
    this.server = serve({ port });
    if (this.log) console.log(`Server Listening on Port ${port}`);
    this.listen();
  }

  use(...middlewares: Middleware[]) {
    this.middlewares.push(...middlewares);
  }

  get(...params: any) {
    this.router.get(...params);
    return this;
  }

  post(...params: any) {
    this.router.post(...params);
    return this;
  }

  private async listen() {
    for await (const request of this.server) {
      for (const middleware of this.middlewares) {
        await middleware(new Context(request));
      }
      const route: Route = this.router.routes.find((route: any) => {
        if (route.path instanceof RegExp) {
          return route.path.test(request.url) && route.method == request.method;
        }
        return route.path == request.url && route.method == request.method;
      });
      if (route) {
        let t0 = performance.now();
        for (const middleware of route.middlewares) {
          await middleware(new Context(request));
        }
        let t1 = performance.now();
        if (this.log) {
          console.log(
            `${request.method}: ${request.conn.remoteAddr.hostname}${request.url} - ${
              (t1 - t0).toFixed(2)
            }ms`,
          );
        }
      }
    }
  }
}
