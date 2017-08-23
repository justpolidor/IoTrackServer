#!/usr/bin/env node

var Web3 = require('../index.js');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var coinbase = web3.eth.coinbase;
console.log(coinbase);
console.log(web3.eth.personal)
var balance = web3.eth.getBalance(coinbase);
console.log(balance.toString(10));

var abi = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "recipient", "type": "address" }, { "name": "message", "type": "string" } ], "name": "sendMessage", "outputs": [], "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "recipient", "type": "address" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "OnMessageSent", "type": "event" } ];

var address = "0xE5b0bF806A3019F4B1CE4e8a844E3Cf600E48301";

var contratto = web3.eth.contract(abi).at(address);

var messaggioRicevuto = contratto.OnMessageSent({});


messaggioRicevuto.watch(function(error, result){
	if (!error) {
		var msg = "Messaggio: " + result.args.message + " per " + result.args.recipient + " (block:" + result.blockNumber + ")";
		console.log(msg);
	}else{
		console.log("errore: "+error);
	}
});

console.log(web3.eth.accounts[0]);

// Bug di geth. Se non c'è un default account impostato alcune funzionalità non si comportano correttamente
//web3.eth.defaultAccount = web3.eth.accounts[0];
//console.log(web3.eth.defaultAccount);
//Unlock del main account per un'ora

web3.eth.defaultAccount = coinbase;

web3.personal.unlockAccount(coinbase, "pa$$w0rd", 3600);

//Invio un messaggio
contratto.sendMessage(address, "Ciao mondo");