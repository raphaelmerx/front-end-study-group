// 1. write a promise that is fulfilled after 3 seconds

var p = new Promise(function(resolve, reject) {
    setTimeout(resolve, 3000);
});

// 2.
var f = function(interval) {
    var p = new Promise(function(resolve, reject) {
        setTimeout(reject, 3000);
        setTimeout(resolve, interval);
    });
};

// 3. logs 1, 3, 2. The executor executes right away, but the fulfillment is added at the end of the job queue.

// 4. TODO
