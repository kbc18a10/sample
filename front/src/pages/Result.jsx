import React,{useState} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from 'react-router-dom';
import '../css/Result.css'
import img_toHome from '../images/Result/toHome.png'
import img_toLobby from '../images/Result/toLobby.png'

const useStyles = makeStyles({
    button: {
    }
  });
  

const Result = ({id,onChangeState,name,playerScores}) => {
    const classes = useStyles();
    const [scores, setScores] = useState("");
    const [winnerID, setWinnerID] = useState("");
    useEffectDebugger(()=>{
        console.log(playerScores);
        playerScores.sort(function(a,b){
            if(a.score > b.score) return -1;
            if(a.score < b.score) return 1;
            return 0;
        });
        var array = playerScores.map((p,i)=>{
            var id = "result" + p["id"];
            var rank = "1st"
            if(i == 0){
                setWinnerID(id);
            }
            if(i == 1){
                rank = "2nd"
            }else if(i == 2){
                rank = "3rd"
            }else if(i == 3){
                rank = "4th"
            }
            return <div className="playerResultScore" id={id}><div className='rank' id="rank">{rank}</div><div id="playername">{p["name"]}</div><div id="score">&nbsp;Score:{p["score"]}</div></div>
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
            <div class="winner">
                <span id="winner">Winner:</span><span id={winnerID}>{playerScores[0]["name"]}</span>
            </div>
            <div id="scores">
                {scores}
            </div>
            <div id="buttons">
                <Button
                    className={classes.button}
                    component={Link}
                    to="/"
                    onClick={handleChangeStateHome}
                >
                    <img className="toHomeButton" src={img_toHome}></img>
                </Button>
                <Button
                    className={classes.button}
                    component={Link}
                    to="/lobby"
                    onClick={handleChangeStateLobby}
                >
                    <img className="toLobbyButton" src={img_toLobby}></img>
                </Button>
            </div>
        </div>
    );
}

export default Result