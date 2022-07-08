import { resolve } from "https://deno.land/std@0.147.0/path/mod.ts";
import { ConnInfo } from "https://deno.land/std@v0.147.0/http/server.ts";
import { lookup } from "https://deno.land/x/media_types@v2.3.7/mod.ts";
import { Application } from "./application.ts";

export interface ContextInterface {
  _request: Request;
  address: Deno.Addr;
  method: string;
  url: URL;
  body?: BodyInit;
  params?: Record<string, unknown>;
  headers: Headers;
  _status: number;
  _statusText: string;
}

export class Context implements ContextInterface {
  private app: Application;
  readonly _request: Request;
  readonly address: Deno.Addr;
  readonly method: string;
  readonly url: URL;
  body?: BodyInit;
  params: Record<string, unknown> = {};
  headers: Headers;
  _status = 200;
  _statusText = "";

  constructor(app: Application, request: Request, info: ConnInfo) {
    this.app = app;
    this.address = info.remoteAddr;
    this.method = request.method;
    this.url = new URL(request.url);
    this.headers = new Headers();
    this._request = request;
  }
  get request() {
    return this._request;
  }
  send(data: string) {
    this.body = data;
  }
  json(json: Record<string, unknown>) {
    this.body = JSON.stringify(json);
    this.headers.set("Content-Type", "application/json");
  }
  async file(path: string) {
    const file = await Deno.open(path);
    const fileStat = await Deno.stat(path);
    this.body = file.readable;
    this.headers.set(
      "Content-Type",
      lookup(path) ||
        "application/octet-stream",
    );
    this.headers.set("Content-Length", fileStat.size + "");
  }
  status(status: number, statusText: string) {
    this._status = status;
    this._statusText = statusText;
    return this;
  }
  async render(page: string, options: Record<string, unknown>) {
    const templateEngine =
      this.app.engines[this.app.config["view engine"] as string];
    const viewDir = this.app.config.views as string;
    const compiled = await templateEngine(resolve(viewDir, page), options);
    this.body = compiled;
    this.headers.set("Content-Type", "text/html");
  }
}
