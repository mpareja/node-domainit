var domain = require('domain');
module.exports = function (fn, callback) {
  var d = domain.create(),
    error = null, result = undefined;
  d.on('error', function (err) {
    error = err;
    d.dispose();
  });
  d.on('dispose', function () {
    callback(error, result);
  });
  process.nextTick(function () {
    d.run(function () {
      fn(d.intercept(function (data) {
        result = data;
        d.dispose();
      }));
    });
  });
};
