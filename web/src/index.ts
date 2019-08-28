import { User, UserProps } from "./models/User";
import { config } from "dotenv";
import { resolve } from "path";
import { UserForm } from "./views/UserForm";
import { UserEdit } from "./views/UserEdit";
import { Collection } from "./models/Collection";
import { UserList } from "./views/UserList";

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       BACKEND_URL: string;
//     }
//   }
// }

// causes "Cannot statically evaluate fs argument" error
// config({ path: resolve(__dirname, "../.env") });
// so parcel-bundler already includes support for env vars and this isn't needed

// const user = User.buildUser({ name: "Bob", age: 40 });
// const root = document.getElementById("root");
// if (root) {
//   const userEdit = new UserEdit(root, user);
//   userEdit.render();
// }

const users = new Collection<User, UserProps>(
  `${process.env.BACKEND_URL}/users`,
  json => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.getElementById("root");
  if (root) {
    const userList = new UserList(root, users);
    userList.render();
  }
});

users.fetch();
