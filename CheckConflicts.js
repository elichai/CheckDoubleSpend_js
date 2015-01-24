var bitcore = require('bitcore');

var Peer = bitcore.transport.Peer;

// default port
//peer = new Peer('5.9.85.34'); //seed.bitcoin.sipa.be
peer = new Peer('seed.bitcoin.sipa.be');

peer.on('ready', function() {
    console.log(peer.version, peer.subversion, peer.bestHeight);
    var message = new bitcore.transport.Messages.GetMempool();
    peer.sendMessage(message);
});

peer.on('disconnect', function() {
    console.log('connection closed');
});

//// handle events
//peer.on('inv', function(message) {
//    console.log(message.inventory);
//    // message.inventory[]
//});
//peer.on('tx', function(message) {
//    console.log(message.transaction);
//    // message.transaction
//});

peer.on('inv', function(message) {

    for(var i = 0; i < message.inventory.length; i++) {
        var txhash = message.inventory[i].hash.toString('hex').match(/../g).reverse().join('');

        console.log(txhash);
    }

    //var txhash = message.inventory[0].hash.toString('hex');
    //var txhash2 = message.inventory[0].hash.toString('hex').match(/../g).reverse().join('');
    //console.log('before: ' + txhash + ' after: ' + txhash2);
    //var transaction = new bitcore.Transaction();
    //console.log(txhash.toString('hex'));
    //console.log(message.inventory[0]);
    // message.addresses[]
});

peer.connect();
