# chai-return-bool

A simple utility library to return a boolean with [chai.js](https://github.com/chaijs/chai) instead of raising an exception.

## Installation

via [npm](https://github.com/npm/npm)

```
npm install chai-return-bool
```

# Usage

Say you are using `chai` to assert against a piece of code

```js
const expect = require('chai').expect;
// ...
expect(foo()).to.be.closeTo(10, 1e-10);
```

You want a boolean `true` or `false` instead of an exception. You can wrap the assertion with `chai-return-bool`.

```js
const expect = require('chai').expect;
const returnBool = require('chai-return-bool').returnBool;
// ...
returnBool(() => expect(foo()).to.be.closeTo(10, 1e-10)); // Returns: true or false
```

`chai-return-bool` works with all `chai` assertion styles.

## Async

If `block` returns a `Promise`, `returnBool` returns a `Promise` that resolves to `true` or `false`.

# API

```ts
/**
 * Call block and return true if it does not raise a chai.AssertionError
 * 
 * Return false if block returns a chai.AssertionError
 * 
 * If any other exception is raised, that exception will not be caught by returnBool.
 */
function returnBool<T>(block: () => T): T extends Promise<any> ? Promise<boolean> : boolean
```
