
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Server listening at URL', baseUrl);
  });
};
boot(app, __dirname, function(err) {
  if (err) throw err;
  if (require.main === module)
    app.start();
});