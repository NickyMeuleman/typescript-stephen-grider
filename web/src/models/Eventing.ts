import { Callback } from "./Model";

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    // only needed if this.events[eventName] was undefined, .push mutates
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName] || [];
    // perf improvement: early return if no handlers or empty array
    handlers.forEach(handler => handler());
  };
}
