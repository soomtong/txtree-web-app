port = 3031

express = require 'express'
nunjucks = require 'nunjucks'

server = express()

nunjucks.configure('', {
	autoescape: false,
	express: server
});

server.use express.static './'

server.get '*', (req, res) ->
	res.render 'index.html'


server.listen port, ->
	console.log "run server #{port} open browser and start app"

