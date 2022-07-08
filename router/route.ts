import { MatchFunction } from "https://deno.land/x/path_to_regexp@v6.2.1/index.ts";
import { Middleware } from "../middlewares/middleware.ts";
export type Path = string | RegExp;
export type Route = {
  method: string;
  match: MatchFunction;
  middlewares: Middleware[];
};
