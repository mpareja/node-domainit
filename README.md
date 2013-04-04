# domainit - wrap a function with the safety of a domain

Wrap a function with the warm comfort of a node domain using standard callbacks.

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
