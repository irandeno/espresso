type Handler = (ctx: any) => unknown;
export type Path = string | RegExp;
export type Route = {
	method: string;
	path: Path;
	handler: Handler;
};
