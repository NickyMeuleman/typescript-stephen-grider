"use strict";
var Sorter = /** @class */ (function () {
    // this public shorthand in the constructor is equivalent to assigning this.collection
    // to the collection argument and defining the type of this.collection above.
    function Sorter(collection) {
        this.collection = collection;
    }
    Sorter.prototype.sort = function () {
        var _a;
        var length = this.collection.length;
        for (var i = 0; i < length; i++) {
            for (var j = 0; j < length - i - 1; j++) {
                if (this.collection[j] > this.collection[j + 1]) {
                    _a = [
                        this.collection[j + 1],
                        this.collection[j]
                    ], this.collection[j] = _a[0], this.collection[j + 1] = _a[1];
                }
            }
        }
    };
    return Sorter;
}());
var test = new Sorter([5, 3, -3, 9, -33]);
console.log(test.collection);
test.sort();
console.log(test.collection);
