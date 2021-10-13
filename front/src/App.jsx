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
import {useState} from 'react';
import Operation from './Operation';
//import Chat from './Chat';
import Chat2 from './Chat2';
/*
var STATE = {
  home : {value : 0, string : 'Home', memo : 'home画面'},
  main : {value : 1, string : 'Main', memo : 'main画面'},
  game : {value : 2, string : 'Game', memo : 'game画面'}
};
*/

const App = () => {

  /*const [state, setState] =　useState(STATE['home']);

  const handleSetState = (newState) => {
    setState(newState);
  }

  const [isHome, setIsHome] = useState(true);

  const handleSetIsHome = (flg) => {
    setIsHome(flg)
  }

  console.log(isHome);


  return (
    <div className="App">
      {/*state == STATE['home'] && <Home onChangeState={handleSetState}/>}
      //state == STATE['game'] && <Game onChangeState={handleSetState}/>
      state == STATE['main'] && <Main onChangeState={handleSetState}/> 
      {/*isHome?
        <div>
          <Home onHome={handleSetIsHome}/>
        </div>
        :
        <div>
          <SocketCommunication/>
          <Router>
            <Switch>

              {/*ロビー画面*//*
              <Route path='/lobby' component={Lobby} />

              {/*ルール説明画面*//*
              <Route path='/rule-description' component={RuleDescription} />

              {/*ゲーム画面*//*
              <Route path='/game' component={Game} />

              {/*結果画面*//*
              <Route path='/result' component={Result} />

            </Switch>
          </Router>
      </div>}

    </div>
  );
  }
  */

  const [entered, setEntered] = useState(false);
  const [name, setName] = useState('');

  const handleEnter = (name) => {
    setEntered(true);
    setName(name);
  }

  const handleLeave = () => {
    setEntered(false);
  }

  return (
    <div className="App">
      
      <Router>
        <Switch>

          {/*ロビー画面*/}
          <Route path='/lobby' component={Lobby} />

          {/*ルール説明画面*/}
          <Route path='/rule-description' component={RuleDescription} />

          {/*ゲーム画面*/}
          <Route path='/game' component={Game} />

          {/*結果画面*/}
          <Route path='/result' component={Result} />

          {/*ホーム画面*/}
          <Route path='/' component={Home} />

        </Switch>
      </Router>
      <div>
      <Operation onEnter={handleEnter} onLeave={handleLeave} entered={entered} />
      { entered && <Chat2 name={name} />}
    </div>
    </div>

  );
}

export default App;
