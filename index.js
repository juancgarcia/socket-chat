const express = require('express');
var app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('port', process.env.PORT || 3001)

app.get('/', (req, res)=>{
    // res.send('hello!')
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket=>{
  console.log('a user connected');
  socket.on('disconnect', ()=>{
      console.log('user disconnected')
  })
  socket.on('chat message', (message)=>{
    io.emit('chat message', message)
    // socket.broadcast.emit('chat message', message)
    console.log(`chat message: ${message}`)
  })
});

http.listen(app.get('port'), (err)=>{
    console.log(`connected on port ${app.get('port')}`)
})