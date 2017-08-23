
var Web3 = require('../index.js');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var coinbase = web3.eth.coinbase;

var abi = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "recipient", "type": "address" }, { "name": "message", "type": "string" } ], "name": "sendMessage", "outputs": [], "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "recipient", "type": "address" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "OnMessageSent", "type": "event" } ];

var address = "0xE5b0bF806A3019F4B1CE4e8a844E3Cf600E48301";

var contratto = web3.eth.contract(abi).at(address);

web3.eth.defaultAccount = coinbase;
web3.personal.unlockAccount(coinbase, "pa$$w0rd", 3600);

//Invio un messaggio
contratto.sendMessage(address, "Ciao mondo " + myFunction() );
contratto.sendMessage(address, "Ciao mondo " + myFunction() );
contratto.sendMessage(address, "Ciao mondo " + myFunction() );
contratto.sendMessage(address, "Ciao mondo " + myFunction() );
contratto.sendMessage(address, "Ciao mondo " + myFunction() );



function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function myFunction() {
    var d = new Date();

    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
	var ms = addZero(d.getMilliseconds());
	
    return h + ":" + m + ":" + s + ":" + ms;
}
