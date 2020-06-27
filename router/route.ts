import { Middleware } from "../middlewares/middleware.ts";
type Handler = (ctx: any) => unknown;
type Path = string | RegExp;
type Route = {
  method: string;
  path: Path;
  middlewares: Middleware[];
};
export { Handler, Path, Route };
