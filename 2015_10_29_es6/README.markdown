<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Exercises](#exercises)
  - [Classes](#classes)
  - [Promises](#promises)
  - [Iterators](#iterators)
- [Notes](#notes)
  - [Promises](#promises-1)
  - [Iterators and iterables](#iterators-and-iterables)
  - [Generators](#generators)
  - [Bonus: Sets](#bonus-sets)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Exercises

### Classes

* build a Rectangle class.
  * getArea method
  * prevent setting the length to a negative value
  * static variable that contains the count of instantiated objects
* build a Square class that inherits from rectangle

[Solution](solutions/classes.js)

### Promises

Use this promise visualization playground: http://bevacqua.github.io/promisees/.

1. write a promise that is fulfilled after 3 seconds

2. Write a function that takes in a delay in milliseconds, and returns a promise. If the delay is lower than 3,000 ms, it will resolve. If the delay is higher than that, it'll be rejected.

3. what will the following code log? why?
```javascript
let p = new Promise(function(resolve, reject){ // this function is called the promise 'executor'
    console.log('1')
    resolve();
})

p.then(() => console.log('2'))

console.log('3')
```
4. Make that promise throw an error on rejection, and log the error message when the promise is rejected.

[Solutions](solutions/promises.js)

### Iterators

1. Create a function that returns the iterator [0, 1, 2, ...]
2. Given an array, store in a variable an iterator that has the same values.
3. Create an iterable class.
4. Implement a `parrot` iterator that returns what is given to it.

[Solutions](solutions/iterators.js)

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
  yield* 'foo'
}
```

### Bonus: Sets

```javascript
var s = new Set([3, 2, 1]);

// all values in a set are unique
s.add(3)
console.log(s.size) // 3

// check if a value is in a set
console.log(s.has(12)) // false

// sets are iterable, but do not support indexing
s.forEach(i => console.log(i)) // 3, 2, 1

// convert the set back to an array
var arrayFromSet = [...s]
```


