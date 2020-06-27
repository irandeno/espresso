const { readAll } = Deno;
import { ServerRequest } from "https://deno.land/std@v0.50.0/http/server.ts";

export interface ContexInterface {
  hostname: object;
  method: string;
  url: string;
  body: object | string;
  send(body: string): void;
  json(body: object | string): void;
  [key: string]: any;
  params?: Record<string, unknown>;
}

const decoder = new TextDecoder();
export class Context implements ContexInterface {
  readonly #_request: ServerRequest | any;
  readonly hostname: object;
  readonly method: string;
  readonly url: string;
  readonly body: object | string;
  params?: Record<string, unknown> = {};

  constructor(request: ServerRequest) {
    this.hostname = request.conn.remoteAddr;
    this.method = request.method;
    this.url = request.url;
    this.#_request = request;
    this.body = request.body;
  }
  async getBody() {
    return decoder.decode(await readAll(this.#_request.body));
  }
  get request() {
    return this.#_request;
  }
  send(body: string) {
    return this.#_request.respond({ body });
  }
  json(body: string | object) {
    if (typeof body == "string") {
      return this.#_request.respond({ body });
    }
    return this.#_request.respond({ body: JSON.stringify(body) });
  }
}
