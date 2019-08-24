import faker from "faker";
import { Mappable } from "./Map";

class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    };
  }
  getMarkerContent(): string {
    return `User name: ${this.name}`;
  }
}

export { User };
