import { AxiosPromise } from "axios";

export type Callback = () => void;

interface HasId {
  id?: number;
}

interface ModelAttributes<T> {
  set: (value: T) => void;
  getAll: () => T;
  get: <U extends keyof T>(key: U) => T[U];
}

interface Sync<T> {
  fetch: (id: number) => AxiosPromise<T>;
  save: (data: T) => AxiosPromise<T>;
}

interface Events {
  on: (eventName: string, callback: Callback) => void;
  trigger: (eventName: string) => void;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

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

  set(update: T): void {
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
