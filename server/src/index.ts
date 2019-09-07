import express from "express";
import bodyParser = require("body-parser");
import cookieSession = require("cookie-session");
import { AppRouter } from "./AppRouter";
import "./controllers/AuthController";
import "./controllers/RootController";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["ifoghd"] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log("listening at http://localhost:3000 🚀");
});
