import React,{useState} from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from 'react-router-dom';
import Operation from '../components/Operation';

const useStyles = makeStyles({
    button: {
    }
  });
  
const Lobby = ({onChangeState, onSetName, name}) => {
    const [flg,setFlg ] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    const classes = useStyles();

    const handleChangeStateSingle = () => {
        onChangeState("single");
    }

    const handleChangeStateMulti = () => {
        onChangeState("multi");
    }

    const handleChangeStateRule = () => {
        onChangeState("rule");
    }

    const handleSetName = (name) => {
        onSetName(name);
        setPlayerName(name);
    }

    const handleSetFlg  = () => {
        setFlg(true)
    }

    return (
        <div className="Lobby"> 
            <h1>ロビー画面</h1>
            <Button
                className={classes.button}
                component={Link}
                to="/game"
                onClick={handleChangeStateSingle}
                disabled={playerName.length == 0}
            >
                single play
            </Button>
            <Button
                className={classes.button}
                component={Link}
                to="/game"
                onClick={handleChangeStateMulti}
                disabled={playerName.length == 0}
            >
                multi play
            </Button>
            <Button
                className={classes.button}
                component={Link}
                to="/rule-description"
                onClick={handleChangeStateRule}
            >
                rule description
            </Button>
            <Button
                className={classes.button}
                onClick={handleSetFlg}
            >
                redirect
            </Button>
            {flg&&<Redirect to="/" />}
            <Operation onSetName={handleSetName} name={name}/> 
        </div>
    );
}

export default Lobby