import { resolve } from "https://deno.land/std@0.147.0/path/mod.ts";
import { match } from "https://deno.land/x/path_to_regexp@v6.2.1/index.ts";
import { Context } from "../context.ts";
import { Middleware } from "../middlewares/middleware.ts";
import { Path, Route } from "./route.ts";

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

  static(path: Path, dir: string) {
    this.add("GET", path + "/:filepath+", [async (c) => {
      const filename = (c.params.filepath as string[]).join("/");
      const filePath = resolve(dir + filename);
      const exists = async (fp: string) => {
        try {
          await Deno.stat(fp);
          return true;
        } catch (error) {
          if (error instanceof Deno.errors.NotFound) {
            return false;
          } else {
            throw error;
          }
        }
      };
      if (await exists(filePath)) {
        await c.file(filePath);
      } else {
        c.status(404, "File not found");
      }
    }]);
    return this;
  }

  private add(method: string, path: Path, middlewares: Middleware[]) {
    this.routes = [...this.routes, {
      method,
      match: match(path, {
        decode: decodeURIComponent,
      }),
      middlewares,
    }];
  }

  async handleRequest(
    context: Context,
    log: boolean,
  ) {
    for (const route of this.routes) {
      const match = route.match(context.url.pathname);
      if (match && route.method === context.method) {
        const t0 = performance.now();
        context.params = match.params as Record<string, unknown>;
        for await (const middleware of route.middlewares) {
          await middleware(context);
        }
        const t1 = performance.now();
        if (log) {
          console.log(
            `${context.method}: ${context.url} - ${(t1 - t0).toFixed(2)}ms`,
          );
        }
        return new Response(context.body, {
          headers: context.headers,
          status: context._status,
          statusText: context._statusText,
        });
      }
    }
    return new Response("404", {
      status: 404,
    });
  }
}
