import React,{useState} from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from 'react-router-dom';
import Operation from '../components/Operation';

const useStyles = makeStyles({
    button: {
    }
  });
  
const Lobby = ({onChangeState, onSetName, name, myself, players}) => {
    const [flg,setFlg ] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    const classes = useStyles();

    const handleChangeStateSingle = () => {
        onChangeState("single");
        setFlg(true);
    }

    const handleChangeStateMulti = () => {
        onChangeState("multi");
        setFlg(true);
    }

    const handleChangeStateRule = () => {
        onChangeState("rule");
    }

    const handleSetName = (name) => {
        onSetName(name);
        setPlayerName(name);
    }

    return (
        <div className="Lobby"> 
            <h1>ロビー画面</h1>
            <Button
                className={classes.button}
                onClick={handleChangeStateSingle}
                disabled={playerName.length == 0 || flg}
            >
                single play
            </Button>
            <Button
                className={classes.button}

                onClick={handleChangeStateMulti}
                disabled={playerName.length == 0 || flg}
            >
                multi play
            </Button>
            {flg&&myself&&players&&<Redirect to="/game" />}
            <Button
                className={classes.button}
                component={Link}
                to="/rule-description"
                onClick={handleChangeStateRule}
            >
                rule description
            </Button>
           
            <Operation onSetName={handleSetName} name={name}/> 
        </div>
    );
}

export default Lobby