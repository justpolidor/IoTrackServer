/**
 * Created by justin on 26/06/16.
 */
var routes = require('./handlers');
var trucks = require('./handlers/trucks');
var download = require('./handlers/download');

module.exports = function (app) {
    /*
    app.get('/', routes.index);
    app.get('/trucks', trucks.list);
    */
    
    app.get('/', routes.index);
    
    app.namespace('/trucks', function (req,res) {
        app.get('/', trucks.index);
        app.get('/:id', trucks.id);
    });
    
    app.namespace('/download', function (req,res) {
        app.get('/', download.index);
        app.get('/:id', download.id);
    });

    app.use(function (req,res) {
        res.status(400);
        res.render('404.jade',
            {
                title: '404',
                message: 'Not Found'
            }
        );
    })
};