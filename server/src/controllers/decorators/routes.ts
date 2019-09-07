import "reflect-metadata";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { RequestHandler } from "express";

interface RouteHandlerDescriptor extends PropertyDescriptor {
  // value is optional in PropertyDescriptor so it should be here as well
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return function(path: string) {
    // a decorator inside a class receives that class' prototype as target parameter
    return function(
      target: any,
      key: string,
      desc: RouteHandlerDescriptor
    ): void {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key);
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.GET);
export const post = routeBinder(Methods.POST);
export const put = routeBinder(Methods.PUT);
export const del = routeBinder(Methods.DEL);
export const patch = routeBinder(Methods.PATCH);
