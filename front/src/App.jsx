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
import SocketCommunication from './components/SocketCommunication';
import {useState, useEffect} from 'react';

var STATE = ['home','lobby','rule','single','singleResult','multi','multiResult'];


const App = () => {

  const [name, setName] = useState('');
  const [state, setState] =　useState(STATE[0]);
  const [myself, setMyself] = useState();
  const [players, setPlayers] = useState();
  const [isSingle, setIsSingle] = useState(true);
  const [clickedTileID, setClickedTileID] = useState();
  const [isReady,setIsReady] = useState(false);
  const [tileTable, setTileTable] = useState();

  useEffect(() => {
    setClickedTileID();
  },[clickedTileID])

  const handleSetState = (newState) => {
    setState(newState);
    if(STATE.indexOf(newState)< 3){
      setIsReady(false);
      setMyself();
      setPlayers();
    }
    if(STATE.indexOf(newState) == 3){
      setIsSingle(true);
    }
    if(STATE.indexOf(newState) == 5){
      setIsSingle(false);
    }
  }

  const handleSetName = (name) => {
    setName(name);
  }

  const handleChangeMyself = (myself) => {
    setMyself(myself);
  }

  const handleChangePlayers = (players) => {
    setPlayers(players);
  }

  const handleTileClick = (id) => {
    setClickedTileID(id);
  }

  const handleIsReady = (flg) => {
    setIsReady(flg);
  }

  const handleChangeTileTable = (table) => {
    setTileTable(table);
  } 

  const handleSetStartTime = (data) => {
    var dateCurrent = new Date().getTime();
    var miliSecTurnning = data.startTime - dateCurrent
    console.log("dead:"+data.startTime);
    console.log("curr:"+dateCurrent);
    console.log("mtur:"+miliSecTurnning);
    setTimeout(()=>{
      console.log("時間です");
      setTileTable(data.table);
    },miliSecTurnning);
  }

  return (
    <div className="App">
      <Router>
        <Switch>

          {/*ロビー画面*/}
          <Route path="/lobby" render={() => <Lobby onChangeState={handleSetState} onSetName={handleSetName} name={name} myself={myself} players={players}/>} />

          {/*ルール説明画面*/}
          <Route path="/rule-description" render={() => <RuleDescription onChangeState={handleSetState} />} />

          {/*ゲーム画面*/}
          <Route path="/game" render={() => <Game onChangeState={handleSetState} state={state} name={name} onTileClick={(id) => handleTileClick(id)} onButtonReady={(flg) => handleIsReady(flg)} table={tileTable}/>} />

          {/*結果画面*/}
          <Route path="/result" render={() => <Result onChangeState={handleSetState} name={name}/>} />

          {/*ホーム画面*/}
          <Route path="/" render={() => <Home onChangeState={handleSetState} />} />

        </Switch>
      </Router>
      {2 < STATE.indexOf(state) && <SocketCommunication name={name} changeMyself={(myself) => handleChangeMyself(myself)} changePlayers={(players) => handleChangePlayers(players)} isSingle={isSingle} clickedTileID={clickedTileID} isReady={isReady}  onChangeTileTable={(table) => handleChangeTileTable(table)} onSetStartTime={(startTime) => handleSetStartTime(startTime)}/>}
    </div>

  );
}

export default App;
