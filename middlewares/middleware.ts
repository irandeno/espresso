import { Context } from "../context.ts";

export type Middleware = (context: Context) => void;
