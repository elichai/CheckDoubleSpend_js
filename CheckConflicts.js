var Set = require('es6-native-set');
var bitcore = require('bitcore');
var transport = require('bitcore-p2p');
var getInput = require('./transactionTools').getInput;
var PeerManager = require('p2p-manager').PeerManager;
var Peer = transport.Peer;
//var addresss = ['replace-by-fee1.bitcoin.petertodd.org',
//    'replace-by-fee2.bitcoin.petertodd.org',
//    'replace-by-fee3.bitcoin.petertodd.org',
//    'replace-by-fee4.bitcoin.petertodd.org'];
pm = new PeerManager();
pm.addPool("replace-by-fee4.bitcoin.petertodd.org");
//console.log(peerManage.activePeerCount);
//console.log(peerManage.activePeers);
//console.log(peerManage.poolPeers);
//console.log(peerManage.badPeers);
/*
var peer_list = [];
for (var i = 0; i < addresss.length; i++) {
    peer_list.push(new Peer(addresss[i]));
}
for (var i = 0; i < peer_list.length; i++) {
    var peer = peer_list[i];
    console.log(peer);
    peer.on('ready', function() {
        console.log(peer.version, peer.subversion, peer.bestHeight);
        message = new transport.Messages.GetMempool();
        peer.sendMessage(message);
    });

    peer.on('disconnect', function() {
        console.log('connection closed');
    });

    peer.on('inv', function(message) {
        var Myset = new Set();
        var dict = {};
        for(var i = 0; i < message.inventory.length; i++) {
            var txhash = message.inventory[i].hash.toString('hex').match(/../g).reverse().join('');
            Myset.add(txhash);
        }
        console.log(Myset);
        //Myset.forEach(function(value) {
        //    inputs = getInput(value);
        //    if (inputs instanceof Error) console.log(inputs);
        //    else dict[value] = getInput(value);
        //});
    });
    peer.connect();
    console.log('connected')
}

// default port
/*
peer = new Peer(dns.dnsSeeds[0]).setProxy('127.0.0.1', 9050); //seed.bitcoin.sipa.be
//peer = new Peer(dns, bitcore.livenet).setProxy('localhost', 9050);

peer.on('ready', function() {
    console.log(peer.version, peer.subversion, peer.bestHeight);
    message = new transport.Messages.GetMempool();
    peer.sendMessage(message);
});

peer.on('disconnect', function() {
    console.log('connection closed');
});
var set = new Set();
peer.on('inv', function(message) {
    for(var i = 0; i < message.inventory.length; i++) {
        var txhash = message.inventory[i].hash.toString('hex').match(/../g).reverse().join('');
        set.add(txhash);
    }
});

peer.connect();
*/