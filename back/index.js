const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const path = require('path');
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
})

app.use(express.static(path.join(__dirname, '../front/build')));


app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../front/build/index.html'));
});

/*
io.set( 'transports', [ 'websocket' ] );
io.set( 'origins', '*:*' );
*/

//すべてのプレイヤーリスト
var players = {};


const user = {
  1:{color:"blue"},
  2:{color:"yellow"},
  3:{color:"red"},
  4:{color:"green"},
}


var i = 0;

io.on('connection', (socket) => {
  i += 1;
  var index = i;
  console.log('A client connected.');
  socket.on('send',(payload) => {
    console.log(payload);
    socket.broadcast.emit('broadcast',payload);
  });
  socket.on('client_to_server_personal', function(data) {
    //var id = socket.id;
    //io.to(id).emit('server_to_client', {value : user[index].color})
    console.log(data);
    socket.broadcast.emit('someone_disconnect',data);
  });
  socket.on('disconnect', () => {
    console.log('Connection closed.');
  })
})
