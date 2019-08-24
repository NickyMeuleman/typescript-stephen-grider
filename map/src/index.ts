import { User } from "./User";
import { Company } from "./Company";
import { Map } from "./Map";

const customMap = new Map("map");

const user = new User();
const company = new Company();

customMap.addMarker(user);
customMap.addMarker(company);
