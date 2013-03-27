var domain = require('domain');
module.exports = function (fn) {
  var d = domain.create(),
    callback = null, error = null, result = undefined;

  d.on('error', function (err) {
    error = err;
    d.dispose();
  });
  d.on('dispose', function () {
    callback(error, result);
  });
  return function (cb) {
    callback = cb;
    d.run(function () {
      fn(d.intercept(function (data) {
        result = data;
        d.dispose();
      }));
    });
  };
};
