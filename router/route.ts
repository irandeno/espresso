
type Handler = (ctx: any) => unknown;

export type Route = {
  method: string;
  path: string;
  handler: Handler;
};
