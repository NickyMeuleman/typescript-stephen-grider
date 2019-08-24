import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { AxiosResponse } from "axios";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
// type ValueOf<T> = T[keyof T];

const rootUrl = `${process.env.BACKEND_URL}/users`;

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  // black eyed peas say boom, boom, pow
  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    this.sync.fetch(id).then(response => {
      this.set(response.data);
    });
  }

  save(): void {
    const data = this.attributes.getAll();
    this.sync.save(data).then(response => {
      this.events.trigger("save");
    });
  }
}
