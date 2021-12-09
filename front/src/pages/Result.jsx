import React,{useState} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from 'react-router-dom';

const useStyles = makeStyles({
    button: {
    }
  });
  

const Result = ({id,onChangeState,name}) => {
    const [players,setPlayers] = useState();
    const classes = useStyles();

    // useEffectDebugger(()=>{
    //     setPlayers(playerScores);
    //     console.log(players);
    // },[playerScores])

    const handleChangeStateHome = () => {
        onChangeState("home");
    }

    const handleChangeStateLobby = () => {
        onChangeState("lobby");
    }

    return (
        <div className="Result"> 
            {!id && <Redirect to="/"/>}
            <h1>結果画面</h1>
            playerScores:{name}
            <Button
                className={classes.button}
                component={Link}
                to="/"
                onClick={handleChangeStateHome}
            >
                home
            </Button>
            <Button
                className={classes.button}
                component={Link}
                to="/lobby"
                onClick={handleChangeStateLobby}
            >
                lobby
            </Button>
        </div>
    );
}

export default Result