
var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const publicPath = '/';
let outputPath;
outputPath = path.resolve(process.cwd(), 'build');
app.use(publicPath, loopback.static(outputPath));

const crossMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
      'Origin',
      'Content-type',
      'Content-Length',
      'Authorization',
      'Accept',
      'X-Requested-With'],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200
});
app.use(crossMiddleware);
app.use('*', crossMiddleware);
app.get('/home', (req, res) => {
  res.sendFile(path.resolve(outputPath, 'index.html'));
});

app.start = function() {
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Server listening at URL', baseUrl);//port 3000
  });
};
boot(app, __dirname, function(err) {
  if (err) throw err;
  if (require.main === module)
    app.start();
});
