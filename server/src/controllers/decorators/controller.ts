import "reflect-metadata";

import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler, Request, Response, NextFunction } from "express";

function bodyValidators(keys: string[]): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("Missing body");
      return;
    }
    keys.forEach(key => {
      // dont do !req.body[key] here as that catches falsy values as well
      if (!(key in req.body)) {
        res.status(422).send(`Missing property in body: ${key}`);
        return;
      }
    });
    next();
  };
}

export function controller(prefix: string) {
  // a decorator for a class receives the constructor as target parameter
  return function(target: Function): void {
    const router = AppRouter.getInstance();
    // target.prototype will be an empty class object unless the target is set to es5 in tsconfig, WHY
    // * future Nicky: after transpilation by tsc in es5+
    // * the prototype methods on a class are marked as "enumerable:false"
    // * (in the propertyDescriptor)
    // * thus they don't show up in the for...in  loop (or the Object.keys loop)
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.PATH,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.METHOD,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.VALIDATOR, target.prototype, key) ||
        [];
      const validator = bodyValidators(requiredBodyProps);
      if (path) {
        router[method](
          `${prefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
