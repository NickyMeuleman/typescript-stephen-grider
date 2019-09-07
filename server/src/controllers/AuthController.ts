import { Request, Response } from "express";
import { get, controller, post, bodyValidator } from "./decorators";

@controller("")
class AuthController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST">
        <div>
            <label for="email">Email</label>
            <input id="email" name="email" />
        </div>
        <div>
            <label for="password">Password</label>
            <input id="password" name="password" type="password" />
        </div>
        <button type="submit">SUBMIT</button>
    </form>
  `);
  }

  @post("/login")
  @bodyValidator("password", "email")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "hi@hi.com" && password === "password") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email and/or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
  }
}
