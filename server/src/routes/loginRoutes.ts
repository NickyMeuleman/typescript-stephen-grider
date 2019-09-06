import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(
  req: RequestWithBody,
  res: Response,
  next: NextFunction
): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("Not Permitted.");
}

const router = Router();

router.get("/", (req: RequestWithBody, res: Response) => {
  // optional chaining is going to be TIGHT (@theryangeorge)
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
    <div>You are logged in</div>
    <a href="/logout">Logout</a>
    </div>`);
  } else {
    res.send(`
    <div>
    <div>You are not logged in</div>
    <a href="/login">Login</a>
    </div>`);
  }
});

router.get("/login", (req: RequestWithBody, res: Response) => {
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
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "hi@hi.com" && password === "password") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid email and/or password");
  }
});

router.get("/logout", (req: RequestWithBody, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: RequestWithBody, res: Response) => {
  res.send("Here be secrets");
});

export { router };
