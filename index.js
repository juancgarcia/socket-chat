const express = require('express');
var app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set('port', process.env.PORT || 3001)

app.use('/', express.static('./'))

// app.get('/', (req, res)=>{
//     // res.send('hello!')
//     res.sendFile(__dirname + '/index.html')
// })

var messages = []

io.on('connection', socket=>{
  socket.emit('chat history', messages)
  console.log('a user connected');
  socket.on('disconnect', ()=>{
      console.log('user disconnected')
  })
  socket.on('chat message', (message)=>{
    messages.push(message)
    io.emit('chat message', message)
    // socket.broadcast.emit('chat message', message)
    console.log(`chat message: ${message}`)
  })
});

http.listen(app.get('port'), (err)=>{
    console.log(`connected on port ${app.get('port')}`)
})