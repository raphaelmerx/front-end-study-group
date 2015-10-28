## Notes

### Promises

* `then` for when the promise is fulfilled, and `catch` for when it's rejected
* `then` and `catch` also return promises:

```javascript
// ex: then and catch for the original fetch promise
var p = fetch('foo')
p.then(res => {})
p.catch(error => {})

// ex2: catch an error returned by the `then` promise
fetch('foo').then(res => {}).catch(error => {})
```
* promises can have 3 states: pending, fulfilled, and rejected.


### Iterators and iterables

intro: the `for .. of` statement differs from the `for .. in` because it returns the values, not the property names.
```javascript
let arr = [3, 5, 7];

for (let i in arr) {
   console.log(i); // logs "0", "1", "2"
}

for (let i of arr) {
   console.log(i); // logs 3, 5, 7
}
```

Iterators:
* similar to the `__iter__` method in Python
* defined using `[Symbol.iterator]: function`
* should return a `next` function
* `next` function should return an object with `done` and `value`

```javascript
var iterableObject = {
    [Symbol.iterator]: () => {
        items: [1, 2, 3, 4, 5, 3, 2, 3],
        next: function next () {
            return {
                done: this.items.length === 0,
                value: this.items.shift()
            }
        }
    }
}

for (let number of iterableObject) { console.log(number); }
```

### Generators

* Return an iterator
* declared with `function*`:
```javascript
function* generator () {
    yield 'f'
    yield 'o'
    yield 'o'
}
```
* yield can also deconstruct iterables, using `yield*`:
```javascript
function* trailmix () {
  yield 0
  yield* [1, 2]
  yield* foo
}
```

### Bonus: Sets

```javascript
var s = new Set([3, 2, 1]);

// all values in a set are unique
s.add(3)
console.log('size of s is', s.size) // 3

// check if a value is in a set
console.log(s.has(12)) // false

// sets are iterable, but do not support indexing
s.forEach(i => console.log(i)) // 3, 2, 1

// convert the set back to an array
var arrayFromSet = [...s]
```


## Exercises

### Classes

* build a rectangle class.
  * getArea method
  * prevent setting the length to a negative value
  * static variable that contains the count of instantiated objects
* square class that inherits from rectangle

```javascript
class Rectangle {
    constructor(length, height) {
        this._length = length
        this._height = height
        Rectangle.count = !Rectangle.count ? 1 : (Rectangle.count + 1)
    }

    getArea() {
        return this._length * this._height
    }

    get length() {
        return this._length
    }
    set length(value) {
        if (value < 0) {
            throw Error('A rectangle can\'t have a negative length!')
        }
        this._length = value
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length)
    }
}
```

### Promises

* Use this promise visualization playground: http://bevacqua.github.io/promisees/.
* write a promise that is fulfilled after 3 seconds

```javascript
var p = new Promise(function(resolve, reject) {
  setTimeout(resolve, 3000)
})
```
* Write a function that takes in a delay in milliseconds, and returns a promise. If the delay is lower than 3,000 ms, it will resolve. If the delay is higher than that, it'll be rejected.

```javascript
var f = function(interval) {
  var p = new Promise(function(resolve, reject) {
    setTimeout(reject, 3000);
    setTimeout(resolve, interval);
  });
};
```
* what will the following code log? why?

```javascript
let p = new Promise(function(resolve, reject){ // this function is called the promise 'executor'
  console.log('1')
  resolve();
})

p.then(() => console.log('2'))

console.log('3')

// ANS: logs 1, 3, 2. The executor executes right away, but the fulfillment is added at the end of the job queue.
```
  * Make that promise throw an error on rejection, and log the error message when the promise is rejected.

### Iterators

* Create a function that returns the iterator [0, 1, 2, ...]
* Given an array, store in a variable an iterator that has the same values.
```javascript
var arr = [1, 2, 4, 5, 3]
var iter = arr[Symbol.iterator]()
```
* Create an iterable class.

```javascript
class Coucou {
  constructor() {};

  *[Symbol.iterator]() {
    var i = 0;
    while (i < 10) {
      yield i;
      i++;
    }
  }
}

var coucou = new Coucou()
for (let i of coucou) {
  console.log(i)
}
```
* Implement an iterator that returns what is given to it.

```javascript
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
```
