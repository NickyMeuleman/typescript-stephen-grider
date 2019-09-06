"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("Not Permitted.");
}
var router = express_1.Router();
exports.router = router;
router.get("/", function (req, res) {
    // optional chaining is going to be TIGHT (@theryangeorge)
    if (req.session && req.session.loggedIn) {
        res.send("\n    <div>\n    <div>You are logged in</div>\n    <a href=\"/logout\">Logout</a>\n    </div>");
    }
    else {
        res.send("\n    <div>\n    <div>You are not logged in</div>\n    <a href=\"/login\">Login</a>\n    </div>");
    }
});
router.get("/login", function (req, res) {
    res.send("\n  <form method=\"POST\">\n    <div>\n        <label for=\"email\">Email</label>\n        <input id=\"email\" name=\"email\" />\n    </div>\n    <div>\n        <label for=\"password\">Password</label>\n        <input id=\"password\" name=\"password\" type=\"password\" />\n    </div>\n    <button type=\"submit\">SUBMIT</button>\n  </form>\n  ");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === "hi@hi.com" && password === "password") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        res.send("Invalid email and/or password");
    }
});
router.get("/logout", function (req, res) {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", requireAuth, function (req, res) {
    res.send("Here be secrets");
});
