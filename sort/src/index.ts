import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
import { LinkedList } from "./LinkedList";

const numbersColl = new NumbersCollection([5, 3, -3, 9, -33]);
numbersColl.sort();
console.log(numbersColl);

const charColl = new CharactersCollection("amaaiMijnfrak");
charColl.sort();
console.log(charColl);

console.log("ejjj");

const linkedL = new LinkedList();
linkedL.add(4);
linkedL.add(32);
linkedL.add(-4);
linkedL.add(-423);
linkedL.add(6);
linkedL.print();
console.log("------------");

linkedL.sort();
linkedL.print();
