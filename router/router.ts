import { Route, Path } from "./route.ts";
import { Middleware } from "../middlewares/middleware.ts";
export class Router {
  protected routes: Route[] = [];
  get(path: Path, ...middlewares: Middleware[]) {
    this.add("GET", path, middlewares);
    return this;
  }

  post(path: Path, ...middlewares: Middleware[]) {
    this.add("POST", path, middlewares);
    return this;
  }

  put(path: Path, ...middlewares: Middleware[]) {
    this.add("PUT", path, middlewares);
    return this;
  }

  delete(path: Path, ...middlewares: Middleware[]) {
    this.add("DELETE", path, middlewares);
    return this;
  }

  patch(path: Path, ...middlewares: Middleware[]) {
    this.add("PATCH", path, middlewares);
    return this;
  }

  private add(method: string, path: Path, middlewares: Middleware[]) {
    this.routes = [...this.routes, { method, path, middlewares }];
  }
}
