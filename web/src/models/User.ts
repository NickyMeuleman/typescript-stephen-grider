import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = `${process.env.BACKEND_URL}/users`;
// const rootUrl = `http://localhost:3000/users`;

export class User extends Model<UserProps> {
  static buildUser(attr: UserProps): User {
    // no need to pass UserProps here as generic type, TypeScript is wicked smaht
    return new User(new Attributes(attr), new Eventing(), new ApiSync(rootUrl));
  }

  static buildUserCollection() {
    new Collection<User, UserProps>(rootUrl, json => User.buildUser(json));
  }

  // doesn't need to call super() in the constructor if no constructor is defined
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor#Default_constructors

  setRandomAge() {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
