export class Attributes<T> {
  constructor(private data: T) {}

  // where to put the = after the function name is confusing
  // after the angle brackets? before?
  get = <U extends keyof T>(propName: U): T[U] => {
    return this.data[propName];
  };

  getAll = (): T => {
    return this.data;
  };

  set(update: T): void {
    // this.data = { ...this.data, ...update };
    // OR, not completely equivalent
    Object.assign(this.data, update);
  }
}
