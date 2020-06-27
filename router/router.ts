import { Route, Path } from "./route.ts";
import { Middleware } from "../middlewares/middleware.ts";
import { Context } from "../context.ts";

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
    const dynamicRoute: RegExp = this.handleDynamicRoutes(path);
    this.routes = [...this.routes, { method, path: dynamicRoute, middlewares }];
  }

  private handleDynamicRoutes(path: Path): RegExp {
    if (path instanceof RegExp) return path;
    let newPath = path;
    const re = /(?<dynamic>\{(?<identifier>[\w\d]+):(?<type>\w+)\})/g;
    let match;
    while ((match = re.exec(path))) {
      if (match && match.groups) {
        newPath = newPath.replace(
          match[0],
          this.regexGenerator(match.groups.identifier, match.groups.type)
        );
      }
    }
    console.log(new RegExp(newPath));
    return new RegExp(newPath);
  }

  private regexGenerator(identifier: string, type: string): string {
    switch (type) {
      case "number":
        return `(?<${identifier}>\\d+)`;
      case "string":
        return `(?<${identifier}>\\w+)`;
      case "any":
        return `(?<${identifier}>.+)`;
    }
    throw new Error("dynamic route invalid parameter type.");
  }

  handleRequest(request: any, log: boolean) {
    this.routes.forEach(async (route: Route) => {
      let match = route.path.exec(request.url);
      if (match) {
        let t0 = performance.now();
        for (const middleware of route.middlewares) {
          const context = new Context(request);
          context.params = match.groups;
          await middleware(context);
        }
        let t1 = performance.now();
        if (log) {
          console.log(
            `${request.method}: ${request.conn.remoteAddr.hostname}${
              request.url
            } - ${(t1 - t0).toFixed(2)}ms`
          );
        }
      }
    });
  }
}
