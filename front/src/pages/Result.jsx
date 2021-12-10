import React,{useState} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from 'react-router-dom';

const useStyles = makeStyles({
    button: {
    }
  });
  

const Result = ({id,onChangeState,name,playerScores}) => {
    const classes = useStyles();
    const [scores, setScores] = useState("");
    useEffectDebugger(()=>{
        console.log(playerScores);

        var array = playerScores.map((p,i)=>{
            var id = "player" + i;
            return <div className="playerscore" id={id}><span id="playername">PlayerName:{p["name"]}</span><span id="score">&nbsp;Score:{p["score"]}</span></div>
        })

        setScores(array);
    },[playerScores])

    const handleChangeStateHome = () => {
        onChangeState("home");
    }

    const handleChangeStateLobby = () => {
        onChangeState("lobby");
    }

    return (
        <div className="Result"> 
            {!id && <Redirect to="/"/>}
            {scores}
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