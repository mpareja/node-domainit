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
    var active = domain.active;
    callback = !domain.active ? cb
      : function (err, result) {
          active.run(function() {
            cb(err, result);
          });
        };

    d.run(function () {
      fn(d.intercept(function (data) {
        result = data;
        d.dispose();
      }));
    });
  };
};
