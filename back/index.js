const express = require('express');
const app = express();
const http = require('http');
process.on('uncaughtException', function(err) {
  console.log(err);
});

const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const array =  require('./array');

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
var maxPlayer = 4;
// var waitPlayers = [];
var multiPlayers = {};
var multiTileTables = {};

var tileNum = 124;
var tileNum0 = 128;
var rowLength = 44;
var tileArray0 = [...Array(tileNum0)].map(()=>{return 0});
var tileArray1 = [...Array(tileNum)].map(()=>{return 1});
var tileArray2 = [...Array(tileNum)].map(()=>{return 2});
var tileArray3 = [...Array(tileNum)].map(()=>{return 3});
var tileArray4 = [...Array(tileNum)].map(()=>{return 4});
var tileArray5 = [...Array(tileNum)].map(()=>{return 5});
var tileArray = tileArray0.concat(tileArray1).concat(tileArray2).concat(tileArray3).concat(tileArray4).concat(tileArray5);


io.on('connection', (socket) => {
  try{
    var isSingle = false;
    var singlePlayer = {};
    var singleTileTable = [[]];
    var room = "";
    socket.on('join_player',data => {
      console.log('on join_player');
      console.log(multiPlayers);

      isSingle = data.isSingle;

      if(isSingle){
        singlePlayer[socket.id] = {
          socketID: socket.id,
          name: data.name,
          ready:false,
          score:0
        }

        io.to(socket.id).emit('get_players', singlePlayer);
        console.log('emit get_myself');
        io.to(socket.id).emit('get_myself', singlePlayer);
      }else{
        for(var key in multiPlayers){
          if(Object.keys(multiPlayers[key]).length < maxPlayer + 1){
            if(!multiPlayers[key]["isGameStart"]){
              room = "room"+key.substring(4);
              break;
            }
          };
        }
        if(!room){
          for(var idx = 1;;idx++){
            if(!Object.keys(multiPlayers).includes("room"+idx)){
              room = "room"+idx;
              break;
            }
          }
          multiPlayers[room] = {isGameStart:false};
          multiTileTables[room] = [[]];
        }
        
        socket.join(room);
        multiPlayers[room][socket.id] = {
          socketID: socket.id,
          name: data.name,
          ready:false,
          score:0
        }
        //waitPlayers.push(room+":"+socket.id);
        io.to(room).emit('get_players', multiPlayers[room]);
        console.log('emit get_myself');
        io.to(socket.id).emit('get_myself', multiPlayers[room][socket.id]);
      }
    })

    socket.on('set_isReady',data => {
      console.log('on set_isReady');
      if(isSingle){
        singlePlayer[socket.id].ready = data.isReady;
        console.log("emit get_players");
        io.to(socket.id).emit('get_players',singlePlayer);
        console.log('emit get_myself');
        io.to(socket.id).emit('get_myself', singlePlayer);
        var shuffleArray = array.arrayShuffle(tileArray)
        singleTileTable = array.splitArray(shuffleArray,rowLength);
        console.log(singleTileTable);
        console.log('emit all_ready');
        io.to(socket.id).emit('all_ready',{table:singleTileTable,startTime:getStartTime()});
      }else{
        multiSetReady();
      }
      
    })

    function multiSetReady(){
      multiPlayers[room][socket.id].ready =  multiPlayers[room][socket.id].ready?false:true;
      console.log("emit get_players");
      io.to(room).emit('get_players', multiPlayers[room]);
      console.log('emit get_myself');
      io.to(socket.id).emit('get_myself', multiPlayers[room][socket.id]);
      //var deleteWaitPlayers = [];
      var count = 0;
      for(let key in multiPlayers[room]){
        if(key == "isGameStart"){
          continue;
        }
        if(multiPlayers[room][key].ready){
          count++;
        }
        //deleteWaitPlayers.push(room+":"+key);
      }
      //console.log(deleteWaitPlayers.length);
      if(Object.keys(multiPlayers[room]).length == count + 1){
        var shuffleArray = array.arrayShuffle(tileArray)
        multiTileTables[room] = array.splitArray(shuffleArray,rowLength);
        multiPlayers[room]["isGameStart"] = true;
        console.log('emit all_ready');
        io.to(room).emit('all_ready',{table:multiTileTables[room],startTime:getStartTime()});
        //waitPlayers = waitPlayers.filter(wp => !deleteWaitPlayers.includes(wp))
      }
    }

    socket.on('clicked_tile',data => {
      console.log('on clicked_tile');
      console.log('emit someone_clicked_tile');
      console.log(data);
      console.log(data['player']['socketID']);
      var deleteTiles = clickedTileJudge(data,isSingle);
      var socketID = data['player']['socketID'];
      if(isSingle){
        var judge = 0;
        if(deleteTiles.onTile && deleteTiles.deleteTiles.length == 0){
          judge = -1;
          singlePlayer[socket.id].score = (singlePlayer[socket.id].score - 3 < 0) ? 0: singlePlayer[socket.id].score - 3;
        }else if(deleteTiles.onTile){
          judge = 1;
          singlePlayer[socket.id].score += deleteTiles.deleteTiles.length;
        }
        if(deleteTiles.onTile){
          deleteTiles.deleteTiles.forEach((cell)=>{
            console.log(cell);
            singleTileTable[cell.i][cell.j] = 0;
          })
        }
        console.log("emit get_players");
        io.to(socket.id).emit('get_players',singlePlayer,{socketID:socketID,judge:judge});
        console.log('emit get_myself');
        io.to(socket.id).emit('get_myself',singlePlayer);
        io.to(socket.id).emit('someone_clicked_tile',singleTileTable);
      }else{
        var judge = 0;
        if(deleteTiles.onTile && deleteTiles.deleteTiles.length == 0){
          judge = -1;
          multiPlayers[room][socket.id].score = (multiPlayers[room][socket.id].score - 3 < 0) ? 0: multiPlayers[room][socket.id].score - 3;
        }else if(deleteTiles.onTile){
          judge = 1;
          multiPlayers[room][socket.id].score += deleteTiles.deleteTiles.length;
        }
        if(deleteTiles.onTile){
          deleteTiles.deleteTiles.forEach((cell)=>{
            console.log(cell);
            multiTileTables[room][cell.i][cell.j] = 0;
          })
        }
        console.log("emit get_players");
        io.to(room).emit('get_players',multiPlayers[room],{socketID:socketID,judge:judge});
        console.log('emit get_myself');
        io.to(socket.id).emit('get_myself',multiPlayers[room][socket.id]);
        io.to(room).emit('someone_clicked_tile',multiTileTables[room]);
      }
    
    })

    socket.on('disconnect', () => {
      console.log('Connection closed.');
      if(!isSingle){
        multiSetReady();
        io.to(room).emit('player_leave',{name:multiPlayers[room][socket.id]["name"],score:multiPlayers[room][socket.id]["score"]});
        delete multiPlayers[room][socket.id];
        if(Object.keys(multiPlayers[room]).length == 1){
          delete multiPlayers[room];
          delete multiTileTables[room];
        }
        //waitPlayers = waitPlayers.filter(wp => (room +":" + socket.id) != wp);
        //reRoom();
        io.to(room).emit('get_players', multiPlayers[room]);
      }
    })

    /*
    while(!multiPlayers[room]["isGameStart"]){
      setTimeout(()=>{
        if(!waitPlayers.includes(room+":"+socket.id)){
          var preRoom = room;
          var playerName = multiPlayers[room][socket.id].name;
          socket.leave(room);
          delete multiPlayers[room][socket.id];
          for(var wp in waitPlayers){
            var [r,id] = waitPlayers[wp].split(":");
            if(id == socket.id){
              room = r;
            }
          }
          socket.join(room);
          multiPlayers[room][socket.id] = {
            socketID: socket.id,
            name: playerName,
            ready:false,
            score:0
          }
          console.log("emit get_players");
          io.to(preRoom).to(room).emit('get_players', multiPlayers[room]);
          console.log('emit get_myself');
          io.to(socket.id).emit('get_myself', multiPlayers[room][socket.id]);
        }
      },1000)
    }
    */

    function clickedTileJudge(data,isSingle){
      var [i,j] = data.tileID.substr(4).split('-');
      i = Number(i);
      j = Number(j);
      var table = isSingle ? singleTileTable:multiTileTables[room];
      if(table[i][j] == 0){
        //タイルがないところをクリック
        let match = []; 
        let matchNum = [...Array(10)].map(()=>{return 0});
        let matchIndex = [];
        //上方向
        for(var k = i;0<=k;k--){
          if(table[k][j] != 0){
            match.push({type:table[k][j],i:k,j:j});
            matchNum[table[k][j]]++;
            break;
          }
        }
          //下方向
        for(var k = i;k < (tileArray.length/rowLength);k++){
          if(table[k][j] != 0){
            match.push({type:table[k][j],i:k,j:j});
            matchNum[table[k][j]]++;
            break;
          }
        }
          //左方向
        for(var k = j;0<=k;k--){
          if(table[i][k] != 0){
            match.push({type:table[i][k],i:i,j:k});
            matchNum[table[i][k]]++;
            break;
          }
        }
          //右方向
        for(var k = j;k < rowLength;k++){
          if(table[i][k] != 0){
            match.push({type:table[i][k],i:i,j:k});
            matchNum[table[i][k]]++;
            break;
          }
        }
  
        matchNum.forEach((num,idx)=>{
          if(1<num){
            matchIndex.push(idx);
          }
        })
  
        var deleteTiles = match.map((data)=>{
          if(matchIndex.includes(data.type)){
            return {i:data.i,j:data.j}
          }
        })
  
        deleteTiles = deleteTiles.filter(v => v);

        return {onTile: true, deleteTiles:deleteTiles} 
      }else{
        //タイルがあるところをクリック
        return {onTile: false};
      }
    }

    function getStartTime(){
      var time = new Date().getTime();
      console.log(time);
      return time + 1000
    }

    //マッチングの定期処理]
    /*
    function reRoom() {
      console.log(waitPlayers);
      var rooms = [];
      var count = {};
      for(var wp in waitPlayers){
        var [r,id] = waitPlayers[wp].split(":");
        rooms.push(r);
      }
      for (var i = 0; i < rooms.length; i++) {
        var elm = rooms[i];
        count[elm] = (count[elm] || 0) + 1;
      }
      var preRoom = ""
      var nextRoom = "";
      var targetID = "";
      var flg = false;
      for (let currentRoom in count) {
        if(flg){
          nextRoom = currentRoom
          break;
        }
        if(count[currentRoom] < maxPlayer){
          preRoom = currentRoom;
          flg = true;
        }
      }
      if(preRoom && nextRoom){
        waitPlayers.map((wp)=> {
          var [r,id] = wp.split(":");
          if(r == nextRoom){
              targetID = id;
              return preRoom+":"+id
          }else{
              return wp;
          }
        })
      }
    };
    */

  }catch(error){
    console.log(error);
    socket.disconnect();
  }
})
