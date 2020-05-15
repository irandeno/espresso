type Handler = (ctx: any) => unknown;
type Path = string | RegExp;
type Route = {
	method: string;
	path: Path;
	handler: Handler;
};
export { Handler, Path, Route };
