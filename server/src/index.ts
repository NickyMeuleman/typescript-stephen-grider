import express, { Request, Response } from "express";
import { router } from "./routes/loginRoutes";
import bodyParser = require("body-parser");
import cookieSession = require("cookie-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["ifoghd"] }));
app.use(router);

app.listen(3000, () => {
  console.log("listening 🚀");
});
