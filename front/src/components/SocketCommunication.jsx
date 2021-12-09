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
        console.log(players)
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
      onChangeTileTable(table);
    })

    socketRef.current.on('all_ready',(data)=>{
      console.log('on all_ready');
      onSetStartTime(data);
    })

    socketRef.current.on('player_leave',(data)=>{
      console.log('on player_leave');
      console.log(data);
      onPlayerLeave(data)
    })

    return () => {
      console.log('Disconnecting..');
      socketRef.current.disconnect();
      onChangeTileTable();
      setMyself();
      setPlayers();
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

  return (
    <div>
      <br/>
      myself:{JSON.stringify(myself)}
      <br/>
      players:{JSON.stringify(players)}
    </div>

  );
}
  
  export default SocketCommunication;
  