import Router from "@koa/router";

export abstract class InternalRouter {
  protected router: Router;
  public path: string;

  protected constructor(path: string) {
    this.path = path;
    this.router = new Router({ prefix: path });
  }

  getRoutes() {
    return this.router.routes();
  }
}