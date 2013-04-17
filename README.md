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

## warning for node < v0.9.5

Versions of Node before v0.9.5 raise `uncaughtException` events despite errors being handled within a domain. You shouldn't need to handle `uncaughtException` if you are working with domains.

Some testing frameworks, like `mocha`, bind to the `uncaughtException` event. This will wrongly cause tests to fail when errors occur within a domain on Node versions < 0.9.5.

Check out the relevant [issue on GitHub](https://github.com/joyent/node/issues/4375).
