import React, {useEffect, useState, useCallback} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import TileTable from '../components/TileTable';
import Time from '../components/Time';
import axios from 'axios';
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
    // const [init,isInit] = useState(false);
    const [isStartFlg, setIsStartFlg] = useState(false);
    const [playerInfo, setPlayerInfo] = useState();
    const [playerScores, setPlayerScores] = useState(new Array(4));
    const [leavePlayers, setLeavePlayers] = useState([]);

    useEffectDebugger(()=>{
        if(table.startTime>0){
            if(!isStartFlg){
                var array = [];
                var id = 0;
                for(var key in players){
                    if(key != "isGameStart"){
                        array.push({name:players[key]["name"],score:players[key]["score"],id:id});
                        id++;
                    }
                } 
                setPlayerInfo(array);
                // var militime;
                setTimeout(()=>{
                    // console.log(new Date(res.headers.date).getTime());
                    setIsStartFlg(true);                    
                },3000);
                // axios.head(window.location.href).then(res => {
                    // var start = new Date(res.headers.date).getTime() + 3000;
                    // console.log(start);
                    // var now = new Date().getTime();
                    // console.log(now);
                    // militime = start-now;
                    // console.log(militime);
                    // setTimeout(()=>{
                    //     console.log(new Date(res.headers.date).getTime());
                    //     setIsStartFlg(true);                    
                    // },3000);
                // })
                
            }
        }
    },[table])

    useEffectDebugger(()=>{
        if(table.startTime == 0){
            var array = leavePlayers;
            array.push(leavePlayer);
            console.log(array);
            setLeavePlayers(array);
        }
    },[leavePlayer])

    useEffectDebugger(()=>{
        if(table.startTime == 0){
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
                return <div className={'playerGameSocre'} id={id}><span id="playername">{p["name"]}</span><span id="score">&nbsp;Score:{p["score"]}</span></div>
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
                array.push(<div className="playerGameSocre" id={id}><span id="playername">{players[keys[i]]["name"]}</span><span id="score">&nbsp;Score:{players[keys[i]]["score"]}</span></div>)
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
            playerInfo.map((info)=>{
                console.log(info);
            })
            onPlayerScores(playerInfo)
        }
    }

    return (
        <div className="Game"> 
            {flg&&<Redirect to="/result" />}
            <div className='topContext'>
                {playerScores[0]?playerScores[0]:<div className='playerGameSocre'/>}
                {isStartFlg ? <Time gameEnd={(flg)=>handleGameEnd(flg)}/>:<div className="time"></div>}
                {playerScores[1]?playerScores[1]:<div className='playerGameSocre'/>}
            </div>
            {isStartFlg ? <TileTable className={classes.TileTable} onTileClick={(id) => handleTileClick(id)} table={table.table}/>
            :
            <div className='dummytileTable'> {!isStartFlg
                &&
                <div>
                    <p>ready?</p>
                    <Button
                        className={isReady?classes.readyButton:classes.notReadyButton}
                        onClick={handleClickReady}
                    />
                </div>
                }</div>}
            <div className='bottomContext'>
                {playerScores[2]?playerScores[2]:<div className='playerGameSocre'/>}
                {playerScores[3]?playerScores[3]:<div className='playerGameSocre'/>}
            </div>
           
            
        </div>
    );
})

export default Game