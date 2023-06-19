const loopback = require('loopback');

module.exports = function product(Product) {
    Product.addProduct = function (msg, cb) {
        cb(null, 'Greetings... ' + msg);
    }

    Product.remoteMethod('addProduct', {
        accepts: { arg: 'data', type: 'Object' },
        returns: { arg: 'data', type: 'Object' }
    });
}