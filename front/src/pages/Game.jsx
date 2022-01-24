import React, {useEffect, useState, useCallback} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import TileTable from '../components/TileTable';
import Time from '../components/Time';
import axios from 'axios';
import '../css/Game.css';
import plus0 from '../images/Game/plus0.png';
import plus1 from '../images/Game/plus1.png';
import plus2 from '../images/Game/plus2.png';
import plus3 from '../images/Game/plus3.png';
import check0 from '../images/Game/check0.png';
import check1 from '../images/Game/check1.png';
import check2 from '../images/Game/check2.png';
import check3 from '../images/Game/check3.png';


const useStyles = makeStyles({
    button: {
        backgroundColor:'primary'
    },
    notReadyButton:{
        // backgroundColor:'red',
        color: 'red',
        // '&:hover':{
        //     // backgroundColor: 'red'
        //     color: 'green'
        // },
        fontSize:'44px',
        border: 'solid 2px #57464c',
        width:'184px',
        height:'55px',
        position: 'absolute',
        bottom:'5px',
        left:'589px',
        margin: 'auto'
    },
    readyButton:{
        // backgroundColor:'green',
        color: 'green',
        // '&:hover':{
        //     // backgroundColor: 'green'
        //     color: 'red'
        // }, 
        fontSize:'44px',
        border: 'solid 2px #57464c',
        width:'184px',
        height:'55px',
        position: 'absolute',
        bottom:'5px',
        left:'589px',
        margin: 'auto'
    },
    plus0:{
        backgroundImage: `url(${plus0})`,
    },
    plus1:{
        backgroundImage: `url(${plus1})`,
    },
    plus2:{
        backgroundImage: `url(${plus2})`,
    },
    plus3:{
        backgroundImage: `url(${plus3})`,
    },
    check0:{
        backgroundImage: `url(${check0})`,
    },
    check1:{
        backgroundImage: `url(${check1})`,
    },
    check2:{
        backgroundImage: `url(${check2})`,
    },
    check3:{
        backgroundImage: `url(${check3})`,
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
    const [playerIsReady, setPlayerIsReady] = useState(new Array(4));
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
            var array = [];
            var array2 = [];
            var keys = Object.keys(players);
            if(0<=keys.indexOf('isGameStart')){
                keys.splice(keys.indexOf('isGameStart'),1)
            }
            for(var i = 0; i < keys.length;i++){
                console.log(players[keys[i]]);
                var id = "player" + i;
                var id2 = "ready" + i;
                array.push(<div className="playerGameSocre" id={id}><span id="playername">{players[keys[i]]["name"]}</span><span id="score">&nbsp;Score:{players[keys[i]]["score"]}</span></div>)
                var readyClass = "";
                console.log(classes.plus0);
                console.log(classes.check0);
                console.log(classes.check1);
                console.log(classes.check2);
                console.log(classes.check3);
                if(players[keys[i]]['ready']){
                    if(i == 0){
                        readyClass = classes.check0;
                    }else if(i == 1){
                        readyClass = classes.check1;
                    }else if(i == 2){
                        readyClass = classes.check2;
                    }else{
                        readyClass = classes.check3;
                    }
                }else{
                    if(i == 0){
                        readyClass = classes.plus0;
                    }else if(i == 1){
                        readyClass = classes.plus1;
                    }else if(i == 2){
                        readyClass = classes.plus2;
                    }else{
                        readyClass = classes.plus3;
                    }
                }
                array2.push(<span className={readyClass} id={id2}></span>)
            }
            setPlayerScores(array);
            setPlayerIsReady(array2);
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
            {!isStartFlg &&
                <div className='ReadyState'>
                    {playerIsReady}
                </div>
                }
            <div className="tileTable">
                
                {isStartFlg ? <TileTable className={classes.TileTable} onTileClick={(id) => handleTileClick(id)} table={table.table}/>
                :
                <div className='dummytileTable'> 
                    {!isStartFlg &&
                        <div>
                            <Button
                                className={isReady?classes.readyButton:classes.notReadyButton}
                                onClick={handleClickReady}>
                                    Ready?
                            </Button>
                        </div>
                    }
                </div>}
            </div>
            <div className='bottomContext'>
                {playerScores[2]?playerScores[2]:<div className='playerGameSocre'/>}
                {playerScores[3]?playerScores[3]:<div className='playerGameSocre'/>}
            </div>
           
            
        </div>
    );
})

export default Game