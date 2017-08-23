/**
 * Created by justin on 26/06/16.
 */

exports.index = function (req,res) {
    res.send('usage: /truck/ID\n1 for less population. 2 for more population.');
};

exports.id = function (req,res) {
    //res.send('trucks id :' + req.params.id);
    res.format({
        /*
        text : function () {
            res.send('plain');
        },
        */
        json : function () {
            var mqttSender = require('../files/mqttSender.js');
            res.setHeader('Access-Control-Allow-Origin','*');
            switch (req.params.id) {
                case '1':
                    mqttSender.publish1();
                    res.json({status: 'truck with id:'+req.params.id+' has started'});
                    break;
                case '2':
                    mqttSender.publish2();
                    res.json({status: 'truck with id:'+req.params.id+' has started'});
                    break;
                case '3':
                    mqttSender.publish3();
                    res.json({status: 'truck with id:'+req.params.id+' has started'});
                    break;
                case '4':
                    mqttSender.publish4();
                    res.json({status: 'truck with id:'+req.params.id+' has started'});
                    break;
                default :
                    res.status(404).json('Not Found');
            }
        },
        default : function () {
            res.status(406).send('Not Acceptable')
        }
    })
};

