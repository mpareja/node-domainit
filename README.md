# domainit - wrap a function with the safety of a domain

Wrap a function with the warm comfort of a node domain using standard callbacks.

[![Build Status](https://travis-ci.org/mpareja/node-domainit.png)](https://travis-ci.org/mpareja/node-domainit) [![Dependency Status](https://david-dm.org/mpareja/node-domainit/status.png)](https://david-dm.org/mpareja/node-domainit)

```javascript
var assert = require('assert');
var domainit = require('domainit');

function unsafe(cb) {
  process.nextTick(function () {
    throw new Error('Oops!');
  });
}

var safe = domainit(unsafe);
safe(function (err) {
  assert(err);
  assert(err.message === 'Oops!');
});
```
