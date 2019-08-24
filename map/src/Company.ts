import faker from "faker";
import { Mappable } from "./Map";

class Company implements Mappable {
  name: string;
  catchphrase: string;
  location: {
    lat: number;
    lng: number;
  };
  constructor() {
    this.name = faker.company.companyName();
    this.catchphrase = faker.company.catchPhrase();
    this.location = {
      lat: Number(faker.address.latitude()),
      lng: Number(faker.address.longitude())
    };
  }
  getMarkerContent(): string {
    return `
    Company name: ${this.name}
    Catchphrase: ${this.catchphrase}
    `;
  }
}

export { Company };
