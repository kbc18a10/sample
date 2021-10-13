
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

  
const PageRoute = () => {

    /*const [state, setState] =　useState(STATE['home']);
  
    const handleSetState = (newState) => {
      setState(newState);
    }
    */
  
    return (
      <div className="App">
        {/*state == STATE['home'] && <Home onChangeState={handleSetState}/>}
        //state == STATE['game'] && <Game onChangeState={handleSetState}/>
        state == STATE['main'] && <Main onChangeState={handleSetState}/> */}
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
      </div>
    );
  }
  
  export default PageRoute;
  