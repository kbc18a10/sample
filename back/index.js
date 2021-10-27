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


io.on('connection', (socket) => {
  //socket.emit('connectsocket',{name:'name'});

  socket.on('join_player',name => {
    console.log('on join_player');
    players[socket.id] = {
      socketID: socket.id,
      name: name
    }
    io.sockets.emit('get_players',players);
    console.log('emit get_myself');
    io.to(socket.id).emit('get_myself',players[socket.id]);
  })

  socket.on('clicked_tile',data => {
    console.log('on clicked_tile');
    console.log('emit someone_clicked_tile');
    console.log(data);
    io.sockets.emit('someone_clicked_tile',data);
  })
  //console.log(socket);
  //console.log(socket.id);
  /*
  if(Object.keys(players).length >= 4){
    console.log("満員です");
    const msg = "満員です";

    console.log('emit playerFull')
    socket.to(socket.id).emit("playerFull",msg);

    console.log('disconnect()')
    socket.disconnect();
  }

  socket.on('send',(payload) => {
    console.log('on send')
    console.log(payload);
    console.log('emit broadcast')
    socket.broadcast.emit('broadcast',payload);
    console.log(players);
  });
  socket.on('join_room',(payload)=>{
    console.log('on join_room')
    console.log(payload);
    console.log('emit broadcast')
    socket.broadcast.emit('broadcast',payload);
  })
  socket.on('addnewplayer',function(arraivalPlayerData){
    console.log('on addnewPlayer')
    console.log(arraivalPlayerData);
    console.log('emit mySocketID')
    socket.to(socket.id).emit('mySocketID',{
      socketID: socket.id,
      players : players
    });
    players[socket.id] = {
      socketID: socket.id,
      name: arraivalPlayerData.name
    }
    console.log(players);
  })
  
  socket.on('client_to_server_personal', function(data) {
    console.log('on client_to_server_personal')
    //var id = socket.id;
    //io.to(id).emit('server_to_client', {value : user[index].color})
    console.log(data);
    console.log('emit someone_disconnect')
    socket.broadcast.emit('someone_disconnect',data);
  });
  */


  socket.on('disconnect', () => {
    console.log('Connection closed.');
    delete players[socket.id];
    io.sockets.emit('get_players',players);
  })
})

/*
function splitArray(array, part) {
    var tmp = [];
    for(var i = 0; i < array.length; i += part) {
        tmp.push(array.slice(i, i + part));
    }
    return tmp;
}
*/