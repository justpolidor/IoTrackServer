/**
 * Created by justin on 26/06/16.
 */

exports.index = function (req,res) {
    res.send('Qui scarichi il file');
};

exports.id = function(req,res) {
    if(req.params.id == '1') {
        res.download('files/jsons/almaviva_elis_nopop.json', function (err) {
           if(err) {
               console.log(err);
           } 
        });
    }
    else if(req.params.id == '2') {
        res.download('files/jsons/almaviva_elis_pop.json', function (err) {
            if(err) {
                console.log(err);
            }
        });
    }
    else {
        res.send('not found');
    }
};