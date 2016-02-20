#!/usr/bin/env node

var bitcore = require('bitcore');
var transport = require('bitcore-p2p')
var Pool = transport.Pool;
var Networks = bitcore.Networks;
var Peer = transport.Peer;

var dns = Networks.testnet;
dns.dnsSeeds.push('testnet-seed.alexykot.me');
dns.dnsSeeds.push('testnet-seed.bitcoin.schildbach.de');
var testnetPeer = new Peer(dns, bitcore.testnet);

console.log(testnetPeer);



/*
//var arr = ['seed.bitcoin.sipa.be',
//           'dnsseed.bitcoin.dashjr.org',
//           'seed.bitcoinstats.com',
//           'bitseed.xf2.org'];

var arr = ['testnet-seed.alexykot.me',
    'testnet-seed.bitcoin.petertodd.org',
    'testnet-seed.bluematt.me',
    'testnet-seed.bitcoin.schildbach.de'];


var pool = new Pool(Networks.testnet); //Networks.livenet
for(var i=0; i< arr.length; i++) {
    pool._addAddrsFromSeeds(arr[i]);
    pool._fillConnections();
}
pool.connect();
setInterval(print, 10000);

function print() {
    var pool_arr = pool._addrs;
    console.log();
    console.log(pool._connectedPeers)
    //console.log('addr: '+ pool_arr.length + ' connected: '+ pool._connectedPeers.length);
    //console.log(arr);
   for(var i = 0; i < pool_arr.length; i++) {
        //if (arr[i].ip.v6 != '0000:0000:0000:0000:0000:ffff') console.log(arr[i].ip.v6);
        //else console.log(arr[i].ip.v4);
       //console.log(arr[0].ip);
   }
}

    */