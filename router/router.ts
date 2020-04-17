import { Route } from "./route.ts";
type Handler = (ctx: any) => unknown;

export class Router {
  
  protected routes: Route[] = [];

  get(path: string, handler: Handler) {
    this.add("GET", path, handler);
    return this;
  }

  post(path: string, handler: Handler) {
    this.add("POST", path, handler);
    return this;
  }

  put(path: string, handler: Handler) {
    this.add("PUT", path, handler);
    return this;
  }

  delete(path: string, handler: Handler) {
    this.add("DELETE", path, handler);
    return this;
  }
  
  patch(path: string, handler: Handler) {
    this.add("PATCH", path, handler);
    return this;
  }

  private add(method: string, path: string, handler: Handler) {
    this.routes = [...this.routes, { method, path, handler }];
  }
}
