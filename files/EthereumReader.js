#!/usr/bin/env node

var Web3 = require('./web3.js/index.js');
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var abi = [ { "constant": false, "inputs": [], "name": "kill", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "recipient", "type": "address" }, { "name": "message", "type": "string" } ], "name": "sendMessage", "outputs": [], "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "recipient", "type": "address" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "OnMessageSent", "type": "event" } ];

var address = "0xE5b0bF806A3019F4B1CE4e8a844E3Cf600E48301";

var contratto = web3.eth.contract(abi).at(address);

var messaggioRicevuto = contratto.OnMessageSent({});

var array = require('array'),
    arrayMsg = array();


messaggioRicevuto.watch(function(error, result){
	if (!error) {
		//var msg = "Messaggio: " + result.args.message + " per " + result.args.recipient + " (block:" + result.blockNumber + ")";
		console.log("TX:" + result.args.recipient + " (block:" + result.blockNumber + ")");
		arrayMsg.push(result.args.message);
		
	}else{
		console.log("errore: "+error);
	}
});

arrayMsg.on('add', function(msg) {
  arrayMsg.sort(function(a, b) {
    return parseFloat(JSON.parse(a).msg_count) - parseFloat(JSON.parse(b).msg_count);
});
});



var mqtt = require('mqtt');
const USER = 'elis';
const PASS = 'Elis2016!';
var clientId = 'mqttjs_'+ Math.random().toString(16).substr(2, 8);
var BrokerHost = 'giottoelis.cloudapp.net';
var BrokerPort = 1883;

var options = {
    host : BrokerHost,
    port : BrokerPort,
    username : USER,
    password : PASS,
    keepalive : 450,
    client : clientId
};
var mqttclient = mqtt.connect(options);


setInterval(function () { 
	if ( arrayMsg.length > 0)
	{
		console.log('Array:' + JSON.parse(arrayMsg[0]).msg_count ); 
		mqttclient.publish('truckElastic',JSON.parse(arrayMsg[0]).msg);
		arrayMsg.splice(0, 1)
	} 
}, 1000); 
