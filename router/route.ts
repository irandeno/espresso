import { Middleware } from "../middlewares/middleware.ts";
export type Path = string | RegExp;
export type Route = {
  method: string;
  path: RegExp;
  middlewares: Middleware[];
};
