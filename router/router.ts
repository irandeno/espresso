import { Route } from './route.ts';
type Handler = (ctx: any) => unknown;
type Path = string | RegExp;
export class Router {
	protected routes: Route[] = [];

	get(path: Path, handler: Handler) {
		this.add('GET', path, handler);
		return this;
	}

	post(path: Path, handler: Handler) {
		this.add('POST', path, handler);
		return this;
	}

	put(path: Path, handler: Handler) {
		this.add('PUT', path, handler);
		return this;
	}

	delete(path: Path, handler: Handler) {
		this.add('DELETE', path, handler);
		return this;
	}

	patch(path: Path, handler: Handler) {
		this.add('PATCH', path, handler);
		return this;
	}

	private add(method: string, path: Path, handler: Handler) {
		this.routes = [
			...this.routes,
			{ method, path, handler }
		];
	}
}
