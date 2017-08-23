/**
 * Created by justin on 30/06/16.
 */
/**
 * Created by pesce on 17/06/16.
 */
var jsonfile = require('jsonfile');
var file = 'files/jsons/almaviva_elis_alternative.json'; //512 points
var lat;
var lng;
var jsonParsed;
var currentCount=0;


function read(count) {
    var i = count;
    jsonfile.readFile(file, function (err, obj) {
        jsonParsed = obj;
        console.log('ID ' + i);
        //console.log(obj);
        try {
            lat = jsonParsed['features'][0].geometry.coordinates[i][1];
            lng = jsonParsed['features'][0].geometry.coordinates[i][0];
        } catch (err) {
            console.log(err);
        }
    });
}


var setCurrentCount = function (value) {
    currentCount=value;
    read(value);
};

var getCurrentCount = function () {
    return currentCount;
};

var geoObject = function () {
    var obj = {};

    obj.event = {
        payloadData: {
            "id": 3,
            "lat": lat,
            "lon": lng
        }
    };

    var jsonString = JSON.stringify(obj);
    return jsonString;
};
exports.geoObject = geoObject;
exports.getCurrentCount = getCurrentCount;
exports.setCurrentCount = setCurrentCount;