define(function (require) {

    var messages = require('./messages');
    // var print = require('print');
    console.log(messages.getHello());

    return {
        init: function () {
            return 'Initializing...'
        }
    }
});
