import React, {useEffect, useState, useCallback} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from 'react-router-dom';
import TileTalbe from '../components/TileTable';
import Time from '../components/Time';
import '../css/Game.css';

const useStyles = makeStyles({
    button: {
        backgroundColor:'primary'
    },
    notReadyButton:{
        backgroundColor:'red',
        '&:hover':{
            backgroundColor: 'red'
        },
    },
    readyButton:{
        backgroundColor:'green',
        '&:hover':{
            backgroundColor: 'green'
        }, 
    },
    TileTable:{
        margin:"auto"
    }
});
  

const Game = React.memo(({leavePlayer, players, onChangeState,state,name, onTileClick, onButtonReady, table, onPlayerScores}) => {
    const classes = useStyles();
    const [isReady,setIsReady] = useState(false);
    const [flg, setFlg] = useState(false);
    const [init,isInit] = useState(false);
    const [playerInfo, setPlayerInfo] = useState();
    const [playerScores, setPlayerScores] = useState(new Array(4));
    const [leavePlayers, setLeavePlayers] = useState([]);

    useEffectDebugger(()=>{
        if(table){
            if(!init){
                var array = [];
                for(var key in players){
                    if(key != "isGameStart"){
                        array.push({name:players[key]["name"],score:players[key]["score"]});
                    }
                } 
                setPlayerInfo(array);
                console.log(array);
                isInit(true);
            }
        }
    },[table])

    useEffectDebugger(()=>{
        if(table){
            var array = leavePlayers;
            array.push(leavePlayer);
            console.log(array);
            setLeavePlayers(array);
        }
    },[leavePlayer])

    useEffectDebugger(()=>{
        if(table){
            var w_playerInfo = playerInfo;
            for(var key1 in players){
                var pname = players[key1]["name"];
                for(var key2 in playerInfo){
                    if(playerInfo[key2]["name"]==pname){
                        w_playerInfo[key2]["score"] = players[key1]["score"];
                    };   
                }
            } 
            var array = w_playerInfo.map((p,i)=>{
                var id = "player" + i;
                return <div className="playerscore" id={id}><span id="playername">PlayerName:{p["name"]}</span><span id="score">&nbsp;Score:{p["score"]}</span></div>
            })
            setPlayerInfo(w_playerInfo);
            setPlayerScores(array);
        }else{
            console.log(JSON.stringify(players));
            var array = [];
            var keys = Object.keys(players);
            if(0<=keys.indexOf('isGameStart')){
                keys.splice(keys.indexOf('isGameStart'),1)
            }
            for(var i = 0; i < keys.length;i++){
                console.log(players[keys[i]]);
                var id = "player" + i;
                array.push(<div className="playerscore" id={id}><span id="playername">PlayerName:{players[keys[i]]["name"]}</span><span id="score">&nbsp;Score:{players[keys[i]]["score"]}</span></div>)
            }
            setPlayerScores(array);
        }
    },[players])
 
    const handleTileClick = useCallback((id) => {
        onTileClick(id);
    })

    const handleClickReady = () => {
        if(isReady){
            setIsReady(false)
            onButtonReady(false);
        }else{
            setIsReady(true)
            onButtonReady(true);
        }
    }

    const handleGameEnd = (flg) => {
        if(flg){
            setFlg(flg);
            onPlayerScores(playerInfo)
        }
    }

    return (
        <div className="Game"> 
            {!players && <Redirect to="/"/>}
            {table && <Time gameEnd={(flg)=>handleGameEnd(flg)}/>}
            {flg&&<Redirect to="/result" />}
            name:{name}
            {table && <TileTalbe className={classes.TileTable} onTileClick={(id) => handleTileClick(id)} table={table}/>}
            {playerScores[0]?playerScores[0]:<></>}
            {playerScores[1]?playerScores[1]:<></>}
            {playerScores[2]?playerScores[2]:<></>}
            {playerScores[3]?playerScores[3]:<></>}
            {!table
            &&
            <div>
                <p>ready?</p>
                <Button
                    className={isReady?classes.readyButton:classes.notReadyButton}
                    onClick={handleClickReady}
                />
            </div>
            }
            
        </div>
    );
})

export default Game