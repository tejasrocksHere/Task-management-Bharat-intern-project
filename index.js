const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// IO socket
io.on('connection', (socket) => {

  console.log('user connected')
  socket.broadcast.emit('new user',)

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg)
  })

  socket.on('disconnect', function(){
    console.log('1 user disconnected!');
    socket.broadcast.emit('user gone',)
  });
})


http.listen(process.env.PORT || 3000, function(){
  console.log('listening on :3000')
})