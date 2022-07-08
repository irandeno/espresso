import { ConnInfo, serve } from "https://deno.land/std@v0.147.0/http/server.ts";
import { Context } from "./context.ts";
import { Middleware } from "./middlewares/middleware.ts";
import { Path } from "./router/route.ts";
import { Router } from "./router/router.ts";

type ServerConfig = {
  port?: number;
  log?: boolean;
};

type ServerSetConfig = "views" | "view engine";

export type TemplateEngine = (
  filePath: string,
  options: Record<string, unknown>,
) => Promise<string>;

export class Application {
  private log: boolean;
  private port = 3000;
  private router: Router;
  private middlewares: Middleware[];
  config: Record<ServerSetConfig, unknown>;
  engines: Record<string, TemplateEngine>;
  constructor(serverConfig?: ServerConfig) {
    this.port = serverConfig?.port || 80;
    this.log = serverConfig?.log ? true : false;
    this.router = new Router();
    this.middlewares = [];
    this.config = {
      "view engine": undefined,
      views: undefined,
    };
    this.engines = {};
  }

  async start(port: number = this.port) {
    const logger = this.log;
    await serve(this.listen.bind(this), {
      port,
      onListen({ hostname, port }) {
        if (logger) {
          console.log(`Server Listening on http://${hostname}:${port}`);
        }
      },
    });
  }

  set(property: ServerSetConfig, value: unknown) {
    this.config[property] = value;
  }

  use(...middlewares: Middleware[]) {
    this.middlewares.push(...middlewares);
  }

  get(path: Path, ...middleware: Middleware[]) {
    this.router.get(path, ...middleware);
    return this;
  }

  post(path: Path, ...middleware: Middleware[]) {
    this.router.post(path, ...middleware);
    return this;
  }

  put(path: Path, ...middleware: Middleware[]) {
    this.router.put(path, ...middleware);
    return this;
  }

  delete(path: Path, ...middleware: Middleware[]) {
    this.router.get(path, ...middleware);
    return this;
  }

  static(path: Path, dir: string) {
    this.router.static(path, dir);
    return this;
  }

  engine(id: string, engine: TemplateEngine) {
    this.engines[id] = engine;
  }

  private listen(request: Request, info: ConnInfo) {
    const context = new Context(this, request, info);
    this.middlewares.forEach((middleware) => middleware(context));
    return this.router.handleRequest(context, this.log);
  }
}
