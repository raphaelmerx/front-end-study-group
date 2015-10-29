// 1.
function *allIntegers() {
    var i = 0;
    while (true) {
        yield i++;
    }
}

// 2.
var arr = [1, 2, 4, 5, 3];
var iter = arr[Symbol.iterator]();

// 3.
class Coucou {
    constructor() {}

    *[Symbol.iterator]() {
        var i = 0;
        while (i < 10) {
            yield i;
            i++;
        }
    }
}

// 4.

function* parrot() {
    let result = yield 1;
    while (true) {
        result = yield result;
    }
}

let p = parrot();
// initialize the parrot
p.next()
console.log(p.next('hello'))
console.log(p.next('parrot'))
