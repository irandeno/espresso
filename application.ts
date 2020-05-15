import { serve } from "https://deno.land/std@v0.50.0/http/server.ts";
import { Context } from "./context.ts";
import { Router } from "./router/router.ts";

type ServerConfig = {
  port: number;
};


export class Application {
  private port: number = 3000;
  private server: any;
  private router: any;
  constructor(serverConfig?: ServerConfig) {
    this.port = serverConfig?.port || 80;
    this.router = new Router();
  }

  start(port: number = this.port) {
    this.server = serve({ port });
    this.listen();
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
      const route = this.router.routes.find(
        (route: any) => {
          if (route.path instanceof RegExp) return route.path.test(request.url) && route.method == request.method;
          return route.path == request.url && route.method == request.method;
        }
      );
      if (route) {
        route.handler(new Context(request));
      }
    }
  }
}
