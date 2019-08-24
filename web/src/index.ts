import { User } from "./models/User";
import { config } from "dotenv";
import { resolve } from "path";
import axios from "axios";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_URL: string;
    }
  }
}

config({ path: resolve(__dirname, "../.env") });

const me = new User({ age: 28, name: "Nicky" });

me.events.on("hey", () => console.log("ejjj"));
me.events.on("hey", () => console.log("sdfejjj"));

// me.save();

me.events.trigger("hey");
