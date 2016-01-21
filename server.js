const app = {
    port: 3031,
    dev: 'http://localhost:3030',
    prod: 'https://haroocloud.com'
};

const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

nunjucks.configure('view', {
	autoescape: true,
	express: server
});

server.use(express.static(__dirname));
server.get('/embed/bookmarklet', function (req, res) {
    const fs = require('fs');
    fs.readFile('view/bookmarklet.js', { encoding: 'utf-8', flag: 'r' }, function (err, data) {
        res.end(data);
    });
});
server.all('*', function (req, res) {
    var params = {};

    params.hostname = req.hostname == 'localhost' ? app.dev : app.prod;

    res.render('index.html', params);
});

server.listen(app.port, function () {
    console.log(`run server ${app.port} open browser and start app`);
});
