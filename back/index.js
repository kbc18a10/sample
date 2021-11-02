const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const array =  require('./array');

const path = require('path');
const port = process.env.PORT || 4001;

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
let ary = [[]];

var tileNum = 20;
var rowLength = 16;
var tileArray0 = [...Array(tileNum)].map(()=>{return 0});
var tileArray1 = [...Array(tileNum)].map(()=>{return 1});
var tileArray2 = [...Array(tileNum)].map(()=>{return 2});
var tileArray3 = [...Array(tileNum)].map(()=>{return 3});
var tileArray = tileArray0.concat(tileArray1).concat(tileArray2).concat(tileArray3);

io.on('connection', (socket) => {
  //socket.emit('connectsocket',{name:'name'});

  socket.on('join_player',name => {
    console.log('on join_player');
    players[socket.id] = {
      socketID: socket.id,
      name: name,
      ready:false,
      score:0
    }
    io.sockets.emit('get_players',players);
    console.log('emit get_myself');
    io.to(socket.id).emit('get_myself',players[socket.id]);
  })

  socket.on('set_isReady',data => {
    console.log('on set_isReady');
    players[data.player.socketID].ready = data.isReady;
    console.log("emit get_players");
    io.sockets.emit('get_players',players);
    let count = 0;
    for(let key in players){
      if(!players[key].ready){
        return;
      }
      count += 1;
    }
    if(Object.keys(players).length == count){
      ary = array.arrayShuffle(tileArray)
      ary = array.splitArray(ary,rowLength);
      console.log('emit all_ready');
      io.sockets.emit('all_ready',ary);
    }
  })

  socket.on('clicked_tile',data => {
    console.log('on clicked_tile');
    console.log('emit someone_clicked_tile');
    console.log(data);
    var [i,j] = data.tileID.substr(4).split('-');
    i = Number(i);
    j = Number(j);
    if(ary[i][j] == 0){
      //タイルがないところをクリック
      let match = [];
      let matchNum = [...Array(10)].map(()=>{return 0});
      let matchIndex = [];
      //上方向
      for(var k = i;0<=k;k--){
        if(ary[k][j] != 0){
          match.push({type:ary[k][j],i:k,j:j});
          matchNum[ary[k][j]]++;
          break;
        }
      }
       //下方向
      for(var k = i;k < (tileArray.length/rowLength);k++){
        if(ary[k][j] != 0){
          match.push({type:ary[k][j],i:k,j:j});
          matchNum[ary[k][j]]++;
          break;
        }
      }
       //左方向
      for(var k = j;0<=k;k--){
        if(ary[i][k] != 0){
          match.push({type:ary[i][k],i:i,j:k});
          matchNum[ary[i][k]]++;
          break;
        }
      }
        //右方向
      for(var k = j;k < rowLength;k++){
        if(ary[i][k] != 0){
          match.push({type:ary[i][k],i:i,j:k});
          matchNum[ary[i][k]]++;
          break;
        }
      }

      matchNum.forEach((num,idx)=>{
        if(1<num){
          matchIndex.push(idx);
        }
      })

      var deliteTiles = match.map((data)=>{
        if(matchIndex.includes(data.type)){
          return {i:data.i,j:data.j}
        }
      })

      

      deliteTiles = deliteTiles.filter(v => v);
      
      if(deliteTiles.length == 0){
        players[data.player.socketID].score -= 5;
      }else{
        players[data.player.socketID].score += deliteTiles.length;
      }
      deliteTiles.forEach((data)=>{
        console.log(data);
        ary[data.i][data.j] = 0;
      })

    }else{
      //タイルがあるところをクリック
    }
    console.log("emit get_players");
    io.sockets.emit('get_players',players);
    console.log('emit get_myself');
    io.to(socket.id).emit('get_myself',players[socket.id]);
    io.sockets.emit('someone_clicked_tile',ary);
  })

  socket.on('disconnect', () => {
    console.log('Connection closed.');
    delete players[socket.id];
    io.sockets.emit('get_players',players);
  })
})

