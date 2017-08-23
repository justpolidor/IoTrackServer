/**
 * Created by justin on 26/06/16.
 */
var mqtt = require('mqtt');
//var EthereumSender = require('./EthereumSender.js');
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


var publish1 = function () {
    var geoNoPop = require('./points/geopointNoPop.js');
    var count=0;
    var coordinates = setInterval(function () {
        geoNoPop.setCurrentCount(count++);
        mqttclient.publish('truckElastic',geoNoPop.geoObject());
        //EthereumSender.sendTX(geoNoPop.geoObject(),count);
        console.log(geoNoPop.geoObject());
        if(geoNoPop.getCurrentCount()==511) {
            console.log('ID 1 finished');
            clearInterval(coordinates);
        }
    },2000);
};

var publish2 = function () {
    var geoPop = require('./points/geopointPop.js');
    var count=0;
    var coordinates = setInterval(function () {
        geoPop.setCurrentCount(count++);
        mqttclient.publish('truckElastic',geoPop.geoObject());
        console.log(geoPop.geoObject());
        if(geoPop.getCurrentCount()==469) {
            console.log('ID 2 finished.');
            clearInterval(coordinates);
        }
    },2000);
};

var publish3 = function () {
    var geoAlt = require('./points/geopointAlternative.js');
    var count=0;
    var coordinates = setInterval(function () {
        geoAlt.setCurrentCount(count++);
        mqttclient.publish('truckElastic',geoAlt.geoObject());
        console.log(geoAlt.geoObject());
        if(geoAlt.getCurrentCount()==441) {
            console.log('ID 3 finished.');
            clearInterval(coordinates);
        }
    },2000);
};


var publish4 = function () {
    var geoCirc = require('./points/geopointCircle.js');
    var count=0;
    var coordinates = setInterval(function () {
        geoCirc.setCurrentCount(count++);
        mqttclient.publish('truckElastic',geoCirc.geoObject());
        //EthereumSender.sendTX(geoCirc.geoObject(),count);
        console.log(geoCirc.geoObject());
        if(geoCirc.getCurrentCount()==760) {
            count=0;
            console.log('ID 4 finished.');
            console.log('Restarting ID 4');
            //Qui bisogna iniziare di nuovo
            geoCirc.setCurrentCount(0);
            //clearInterval(coordinates);
        }
    },2000);
};


mqttclient.on('connect', function() {
    console.log('Connected!');

});

mqttclient.on('reconnect', function() {
    console.log('reconnecting...');
});

mqttclient.on('error', function(error){
    console.log(error);
});

mqttclient.on('message', function(topic,message){
    console.log("**********Received message********");
    var JSONString = JSON.parse(message.toString());
    console.log(JSONString);
    console.log("***********************************\n")
});

exports.publish1 = publish1;
exports.publish2 = publish2;
exports.publish3 = publish3;
exports.publish4 = publish4;