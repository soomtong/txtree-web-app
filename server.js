var app = {
    port: 3031,
    dev: 'http://localhost:3030',
    prod: 'http://haroocloud.com'
};

var express = require('express');
var nunjucks = require('nunjucks');

server = express();

nunjucks.configure('view', {
	autoescape: true,
	express: server
});

server.use(express.static('./'));

server.all('*', function (req, res) {
    var params = {};

    params.hostname = req.hostname == 'localhost' ? app.dev : app.prod;

    console.log(params.hostname);

    res.render('index.html', params);
});

server.listen(app.port, function () {
    console.log(`run server ${app.port} open browser and start app`);
});


