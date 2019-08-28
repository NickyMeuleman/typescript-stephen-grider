import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

type Deserializer<T, U> = (json: U) => T;

export class Collection<T, U> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: Deserializer<T, U>) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    axios.get(this.rootUrl).then((response: AxiosResponse<U[]>) => {
      response.data.forEach(value => {
        const model = this.deserialize(value);
        this.models.push(model);
      });
      this.trigger("change");
    });
  }
}
