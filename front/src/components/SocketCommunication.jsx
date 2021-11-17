import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';
import {useEffectDebugger} from 'use-debugger-hooks';

const SocketCommunication = ({name, isSingle, clickedTileID, isReady, onChangeTileTable, onSetStartTime}) => {
  const [players, setPlayers] = useState();
  const [myself, setMyself] = useState();
  const [inited, setinited] = useState(false);
  const [tileTable, setTileTable] = useState();

  const socketRef = useRef();

  useEffect(()=>{
    console.log('Connectinng..');
    socketRef.current = io();
    socketRef.current.emit('join_player',{name:name,isSingle:isSingle});
   
    socketRef.current.on('get_players',players => {
        console.log('get_players');
        setPlayers(players);
        console.log(players);
    })

    socketRef.current.on('get_myself',myself => {
        console.log('get_myself');
        setMyself(myself);
        console.log(myself);
    })

    socketRef.current.on('someone_clicked_tile',table => {
      console.log('on someone_clicked_tile');
      setTileTable(table);
      onChangeTileTable(table);
    })

    socketRef.current.on('all_ready',(data)=>{
      console.log('on all_ready');
      setTileTable(data.table);
      onSetStartTime(data);
    })

    return () => {
      console.log('Disconnecting..');
      socketRef.current.disconnect();
      setTileTable();
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
  