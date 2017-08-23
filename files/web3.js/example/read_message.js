#!/usr/bin/env node

var Web3 = require('../index.js');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var abi = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "recipient", "type": "address" }, { "name": "message", "type": "string" } ], "name": "sendMessage", "outputs": [], "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "recipient", "type": "address" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "OnMessageSent", "type": "event" } ];

var address = "0xE5b0bF806A3019F4B1CE4e8a844E3Cf600E48301";

var contratto = web3.eth.contract(abi).at(address);

var messaggioRicevuto = contratto.OnMessageSent({});
var arrayMsg = [];

messaggioRicevuto.watch(function(error, result){
	if (!error) {
		var msg = "Messaggio: " + result.args.message + " per " + result.args.recipient + " (block:" + result.blockNumber + ")";
		console.log("TX:" + msg);
		arrayMsg.push(msg);
	}else{
		console.log("errore: "+error);
	}
});

setInterval(function () { 
	if ( arrayMsg.length > 0)
	{
		console.log('Array:' + arrayMsg[0] ); 
		arrayMsg.splice(0, 1)
	} 
}, 1000); 
