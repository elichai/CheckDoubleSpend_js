/**
 * Created by elichai2 on 19/02/16.
 */

var bitcore_p2p = require('bitcore-p2p');
var getRPC = require('./transactionTools').getRPC;
var client = getRPC(process.env.HOME + '/.bitcoin/bitcoin.conf');

var Peer = bitcore_p2p.Peer;

// default port
//peer = new Peer('5.9.85.34'); //seed.bitcoin.sipa.be
peer = new Peer('seed.bitcoin.sipa.be');

peer.on('ready', function() {
    console.log(peer.version, peer.subversion, peer.bestHeight);
    var message = new bitcore_p2p.Messages.GetMempool();
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

    for(var i = 0; i < 1; i++) {
        // The hash is reversed by bytes (every 1 Hex mumber(2 chars))
        var txhash = message.inventory[i].hash.toString('hex').match(/../g).reverse().join('');
        //console.log(message.inventory[i]);
        client.getrawtransaction(txhash, function(err, rawtx) {
            if (err){
                console.log(err);
                return;
            }
            console.log("txid: " + txhash);
            // the rawtx itself is in result.
            // TODO: check how to get the rawtx via peers.(if conflicts, won't be in the core node.)
            console.log("rawtx:\n" + rawtx.result)
        });
    }

    //var txhash = message.inventory[0].hash.toString('hex');
    //var txhash2 = message.inventory[0].hash.toString('hex').match(/../g).reverse().join('');
    //console.log('before: ' + txhash + ' after: ' + txhash2);
    //var transaction = new bitcore_p2p.Transaction();
    //console.log(txhash.toString('hex'));
    //console.log(message.inventory[0]);
    // message.addresses[]
});

peer.connect();
