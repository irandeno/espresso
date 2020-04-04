import { serve } from "https://deno.land/std/http/server.ts";
import { Context } from "./context.ts";

type ServerConfig = {
  port: number;
};
type Route = {
  method: string;
  path: string;
  handler: Handler;
};

type Handler = (ctx: any) => unknown;

export class Application {
  private port: number = 3000;
  private server: any;
  private routes: Route[] = [];

  constructor(serverConfig: ServerConfig) {
    this.port = serverConfig.port;
  }

  start(port: number = this.port) {
    this.server = serve({ port });
    this.listen();
  }

  get(path: string, handler: Handler) {
    this.add("GET", path, handler);
    return this;
  }
  post(path: string, handler: Handler) {
    this.add("POST", path, handler);
    return this;
  }

  private add(method: string, path: string, handler: Handler) {
    this.routes = [...this.routes, { method, path, handler }];
  }

  private async listen() {
    for await (const request of this.server) {
      const route = this.routes.find(
        (route) => route.path == request.url && route.method == request.method
      );
      if (route != undefined) {
        route.handler(new Context(request));
      }
    }
  }
}
