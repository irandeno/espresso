import { Context } from "../context.ts";

export type Middleware = (context: Context) => Promise<void> | void;
