#!/usr/bin/env node
var bitcore = require('bitcore');
var transport = require('bitcore-p2p');
var RpcClient = require('bitcoind-rpc');
//var RPC = transport.RPC;
var fs = require('fs');

var getRPC = function(PATH) {
    if (!PATH) PATH = process.env.HOME + '/.bitcoin/bitcoin.conf';

    var data = fs.readFileSync(PATH, 'utf8');
    var data_arr = data.split('\n');
    var user, pass;
    for (var i = 0; i < data_arr.length; i++) {
        var line = data_arr[i].split("=");
        var indx = line[0], value = line[1];
        if (indx == "rpcuser") user = value;
        if (indx == "rpcpassword") pass = value;
        if (indx == "testnet") var testnet = value;
    }
    if(!user || !pass) {
        console.error('Wrong conf file OR no rpcuser/rpcpassword in it');
        process.exit(0);
    }
    //noinspection UnnecessaryLocalVariableJS
    var client = new RpcClient( {
        user: user,
        pass: pass,
        protocol: 'http',
        host: '127.0.0.1',
        port: (testnet == 1) ? 18332 : 8332
    });
    
    return client;
};


var getInput = function(txid) {
    var client = getRPC();
    var inputs = [];
    client.getrawtransaction(txid, function(err, rawtx) {
        if (err){
            console.log(err);
            inputs = new Error(err);
        }
        else {
            var transaction = new bitcore.Transaction(rawtx.result);
            var inpt_arr = transaction.inputs;
            for(var i = 0; i < inpt_arr.length; i++) {
                var input = transaction.inputs[i].prevTxId.toString('hex');
                inputs.push(input);
            }
        }
        return inputs;
    });
};

module.exports.getRPC = getRPC;
module.exports.getInput = getInput;
//for(var a in client) {if(typeof client[a] === "function") { console.log(a + ' ') }}
