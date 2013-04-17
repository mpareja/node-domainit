module.exports = function assert(test, message) {
  if (!test) {
    console.error(message);
    process.exit(1);
  }
};
