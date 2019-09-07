import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor): void {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.MIDDLEWARE, target, key) || [];
    Reflect.defineMetadata(
      MetadataKeys.MIDDLEWARE,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
