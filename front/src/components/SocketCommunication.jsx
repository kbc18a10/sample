import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';
import {useEffectDebugger} from 'use-debugger-hooks';

const SocketCommunication = ({name, isSingle, clickedTileID, isReady, onChangeTileTable, onSetStartTime, changeMyself, changePlayers, onPlayerLeave}) => {
  const [players, setPlayers] = useState();
  const [myself, setMyself] = useState();
  const [inited, setinited] = useState(false);

  const socketRef = useRef();

  useEffect(()=>{
    console.log('Connectinng..');
    socketRef.current = io();
    socketRef.current.emit('join_player',{name:name,isSingle:isSingle});
   
    socketRef.current.on('get_players',players => {
        console.log('get_players');
        setPlayers(players);
        changePlayers(players)
    })

    socketRef.current.on('get_myself',myself => {
        console.log('get_myself');
        setMyself(myself);
        changeMyself(myself)
    })

    socketRef.current.on('someone_clicked_tile',table => {
      console.log('on someone_clicked_tile');
      onChangeTileTable({table:table,startTime:0});
    })

    socketRef.current.on('all_ready',(data)=>{
      console.log('on all_ready');
      onSetStartTime(data);
    })

    socketRef.current.on('player_leave',(data)=>{
      console.log('on player_leave');
      onPlayerLeave(data)
    })
    // var x, y, prevX, prevY;
    // var intervalID = window.setInterval(function(){
      
    //   if (prevX !== x || !prevY !== y) {
    //     socket.emit('mouse_position', {mx : x, my : y});
    //   }
    //   prevX = x;
    //   prevY = y;
    // }, 500);

    return () => {
      console.log('Disconnecting..');
      socketRef.current.disconnect();
      onChangeTileTable({table:[],startTime:-1});
      setMyself();
      setPlayers();
      // window.clearInterval(intervalID);
    }
  },[])

  useEffectDebugger(() => {
    if(clickedTileID){
      console.log('emit clicked_tile');
      socketRef.current.emit('clicked_tile',{player:myself,tileID:clickedTileID});
    }
  },[clickedTileID]);

  useEffectDebugger(() => {
    if(!inited){
      setinited(true);
    }else{
      socketRef.current.emit('set_isReady',{player:myself,isReady:isReady});
    }
  },[isReady]);

  return <></>
}
  
  export default SocketCommunication;
  