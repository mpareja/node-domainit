# domainit - run a function within the confines of a domain

Wrap a function with the warm comfort of a node domain using standard callbacks.

```javascript
var assert = require('assert');
var domainit = require('../');
var called = false;

domainit(function (cb) {
  cb(null);
}, function (err) {
  called = true;
  assert(!err);
});

process.on('exit', function () {
  if (!called) {
	throw new Error('Handler not called.');
	process.exit(1);
  }
});
```
