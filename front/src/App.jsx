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
import {useState, useEffect, useRef} from 'react';

var STATE = ['home','lobby','rule','single','singleResult','multi','multiResult'];


const App = () => {

  const [name, setName] = useState('');
  const [state, setState] =　useState(STATE[0]);
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
    }
  }

  const handleSetName = (name) => {
    setName(name);
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

  return (
    <div className="App">
      <Router>
        <Switch>

          {/*ロビー画面*/}
          <Route path="/lobby" render={() => <Lobby onChangeState={handleSetState} onSetName={handleSetName} name={name}/>} />

          {/*ルール説明画面*/}
          <Route path="/rule-description" render={() => <RuleDescription onChangeState={handleSetState} />} />

          {/*ゲーム画面*/}
          <Route path="/game" render={() => <Game onChangeState={handleSetState} state={state} name={name} onTileClick={(id) => handleTileClick(id)} onButtonReady={(flg) => handleIsReady(flg)} table={tileTable}/> } />

          {/*結果画面*/}
          <Route path="/result" render={() => <Result onChangeState={handleSetState} name={name}/>} />

          {/*ホーム画面*/}
          <Route path="/" render={() => <Home onChangeState={handleSetState} />} />

        </Switch>
      </Router>
      {4 < STATE.indexOf(state) && <SocketCommunication name={name} clickedTileID={clickedTileID} isReady={isReady}  onChangeTileTable={(table) => handleChangeTileTable(table)}/>}
    </div>

  );
}

export default App;
