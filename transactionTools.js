#!/usr/bin/env node
var bitcore = require('bitcore');
var RPC = bitcore.transport.RPC;
var fs = require('fs');

var getRPC = function(PATH) {
    if (!PATH) PATH = process.env.HOME + '/.bitcoin/bitcoin.conf';

    var data = fs.readFileSync(PATH, 'utf8');
    var data_arr = data.split('\n');
    var user, pass;
    for (var i = 0; i < data_arr.length; i++) {
        var line = data_arr[i].split("=");
        var indx = line[0];
        var value = line[1];
        if (indx == "rpcuser") user = value;
        if (indx == "rpcpassword") pass = value;
        if (indx == "testnet") var testnet = value;
    }
    if(!user || !pass) {
        console.error('Wrong conf file OR no rpcuser/rpcpassword in it');
        process.exit(0);
    }
    PORT = (testnet == 1) ? 18332 : 8332;
    //noinspection UnnecessaryLocalVariableJS
    var client = new RPC(user, pass, {
        host: 'localhost',  
        port: PORT,
        secure: false,
        disableAgent: true,
        rejectUnauthorized: true
    });
    
    return client;
};

module.exports = getRPC;
//for(var a in client) {if(typeof client[a] === "function") { console.log(a + ' ') }}
