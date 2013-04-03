var domain = require('domain');
module.exports = function (fn) {
  var d = domain.create(), callback = null, error = null, result;

  d.on('error', function (err) {
    error = err;
    d.dispose();
  });
  d.on('dispose', function () {
    callback(error, result);
  });
  return function (cb) {
    var active = domain.active;
    if (domain.active) {
      callback = function (err, result) {
        active.run(function () {
          cb(err, result);
        });
      };
    } else { callback = cb; }

    d.run(function () {
      fn(d.intercept(function (data) {
        result = data;
        d.dispose();
      }));
    });
  };
};
