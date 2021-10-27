import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import RuleDescription from './pages/RuleDescription';
import Game from './pages/Game';
import Result from './pages/Result';
import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';

var STATE = ['home','lobby','rule','single','singleResult','multi','multiResult'];


const App = () => {

  const [name, setName] = useState('');
  const [state, setState] =　useState(STATE[0]);
  const [players, setPlayers] = useState();
  const [myself, setMyself] = useState();
  const [isSocket,setIsSocket] = useState(false);
  const [clickedTileID, setClickedTileID] = useState();

  const socketRef = useRef();

  useEffect(()=>{
    if(isSocket){
      console.log('Connectinng..');
      socketRef.current = io();
      socketRef.current.emit('join_player',name);

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

      socketRef.current.on('someone_clicked_tile',data => {
        console.log('on someone_clicked_tile');
        var element = document.getElementById(data['tileID']);
        element.textContent = data['player']['name'];
      })
    }

    return () => {
      if(isSocket){
        console.log('Disconnecting..');
        socketRef.current.disconnect();
        setMyself();
        setPlayers();
      }
    }
  },[isSocket])

  useEffect(()=>{
      if(clickedTileID){
        socketRef.current.emit('clicked_tile',{player:myself,tileID:clickedTileID});
      }
  },[clickedTileID])

  useEffect(()=>{
    if(4 < STATE.indexOf(state)){
      setIsSocket(true);
    }else{
      setIsSocket(false);
    }
  },[state])


  const handleSetState = (newState) => {
    setState(newState);
  }

  const handleSetName = (name) => {
    setName(name);
  }

  const handleButtonClick = (id) => {
    setClickedTileID(id);
  }

  return (
    <div className="App">
      {state}
      <Router>
        <Switch>

          {/*ロビー画面*/}
          <Route path="/lobby" render={() => <Lobby onChangeState={handleSetState} onSetName={handleSetName} name={name}/>} />

          {/*ルール説明画面*/}
          <Route path="/rule-description" render={() => <RuleDescription onChangeState={handleSetState} />} />

          {/*ゲーム画面*/}
          <Route path="/game" render={() => <Game onChangeState={handleSetState} state={state} name={name} onButtonClick={(id) => handleButtonClick(id)}/> } />

          {/*結果画面*/}
          <Route path="/result" render={() => <Result onChangeState={handleSetState} name={name}/>} />

          {/*ホーム画面*/}
          <Route path="/" render={() => <Home onChangeState={handleSetState} />} />

        </Switch>
      </Router>
      <div>
        myself:{JSON.stringify(myself)}
      </div>
      <div>
        player:{JSON.stringify(players)}
      </div>
    </div>

  );
}

export default App;
