import express from "express";

export class AppRouter {
  private static instance: express.Router;
  static getInstance(): express.Router {
    // ? uses AppRouter instead of 'this' in the course
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}
