#!/usr/bin/env node
var bitcore = require('bitcore');
var getRPC = require('./transactionTools');

/**
 * Returns If the outputs are safe.
* @return {boolean} If the outputs are safe.
 */
var Check_output_address = function(rawtx) {
    //console.log(rawtx)
    var transaction = new bitcore.Transaction(rawtx);
    //console.log(transaction.outputs)
    var tx_arr = transaction.outputs;
    for(var i = 0; i < tx_arr.length; i++) {
        //console.log(tx_arr[i]._scriptBuffer.length);
        if(bitcore.Script(tx_arr[i]._scriptBuffer).isDataOut()) {
            console.error('One of the outputs has OP_RETURN code');
            return false;
        }
        var pubkey = bitcore.Script(tx_arr[i]._scriptBuffer).getPublicKeyHash().toString('hex');
        pubkey = pubkey.substring(0, 6);
        for (var j = 0; j < BlackList.length; j++) {
            if (BlackList[j][0] <= pubkey && pubkey <= BlackList[j][1]) {
                console.log("One of the outputs is used by: " + BlackList[j][2]);
                return false;
            }
        }
    }
    return true;
};

var Main = function(err, rawtx) {
    if (err){
        console.log(err);
        return;
    }
    if (Check_output_address(rawtx.result)) {
        console.log('Your transaction dosen\'t send money to SPAM addresses ' +
        'or usses inputs from SPAM addresses');
    }
};

// CLI commands.
for(var i=2; i<process.argv.length; i++){
    switch(process.argv[i].toLowerCase()) {
        case '-h':
        case '--help':
            console.log('usage: CheckAddress.py [-h] [--conf CONF] TrantasctionID\n');
            console.log('Check if one of the outputs or inputs address\'s are belong to SPAM labele \naddresses.\n');
            console.log('positional arguments:');
            console.log('  TrantasctionID  The transactionID of the transaction you want to check\n');
            console.log('optional arguments:');
            console.log('  -h, --help      Show this help message and exit');
            console.log('  --conf CONF     Specify configuration file (default: bitcoin.conf)');
            process.exit(0);
            break;
        case '--conf':
            var PATH = process.argv[++i];
            break;
        default:
            if(txid) {
                console.error('usage: CheckAddress.py [-h] [--conf CONF] TrantasctionID');
                console.error('CheckAddress.py: error: too few arguments');
                process.exit(1);
            }
            var txid = process.argv[i];
    }

}
if(!txid) {
    console.error('usage: CheckAddress.py [-h] [--conf CONF] TrantasctionID');
    console.error('CheckAddress.py: error: too few arguments');
    process.exit(1);
}
if (!PATH) PATH = process.env.HOME+ '/.bitcoin/bitcoin.conf';
var client = getRPC(PATH);
client.getrawtransaction(txid, Main);

// Hex codes of the address
BlackList = [['06f1b6', '06f1b6', 'SatoshiDice'],
    ['74db37', '74db59', 'BetCoin Dice'],
    ['c4c5d7', 'c4c5d7', 'CHBS'],
    ['434e54', '434e54', 'Counterparty'],
    ['069532', '069532', 'SatoshiBones'],
    ['06c06f', '06c06f', 'SatoshiBones'],
    ['da5dde', 'da5dde', 'Lucky Bit']];
