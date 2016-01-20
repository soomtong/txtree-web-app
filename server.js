const app = {
    port: 3031,
    dev: 'http://localhost:3030',
    prod: 'http://haroocloud.com'
};

const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

nunjucks.configure('view', {
	autoescape: true,
	express: server
});

server.use(express.static(__dirname));
server.get('/1/bookmarklet', function (req, res) {
    res.send('hi');
});
server.all('*', function (req, res) {
    var params = {};

    params.hostname = req.hostname == 'localhost' ? app.dev : app.prod;

    res.render('index.html', params);
});

server.listen(app.port, function () {
    console.log(`run server ${app.port} open browser and start app`);
});
