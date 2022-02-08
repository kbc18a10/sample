import React, {useEffect, useState, useCallback} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import TileTable from '../components/TileTable';
import Time from '../components/Time';
import '../css/Game.css';
import useSound from 'use-sound';
import Sound from '../audio/button.mp3';
import Success from '../audio/success.mp3';
import Miss from '../audio/miss.mp3';
import Finish from '../audio/finish.mp3';
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
        color: 'red',
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
        color: 'green',
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
  

const Game = React.memo(({leavePlayer, players, myself, onChangeState,state,name, onTileClick, onButtonReady, table, onPlayerScores}) => {
    const classes = useStyles();
    const [isReady,setIsReady] = useState(false);
    const [flg, setFlg] = useState(false);
    const [isStartFlg, setIsStartFlg] = useState(false);
    const [playerInfo, setPlayerInfo] = useState();
    const [playerScores, setPlayerScores] = useState(new Array(4));
    const [playerIsReady, setPlayerIsReady] = useState(new Array(4));
    const [leavePlayers, setLeavePlayers] = useState([]);
    const [readyList, setReadyList] = useState({});
    const [playButton1] = useSound(Sound, {volume:1});
    const [playButton2] = useSound(Sound, {volume:0.3});
    const [playSuccess1] = useSound(Success, {volume:1});
    const [playSuccess2] = useSound(Success, {volume:0.3});
    const [playMiss1] = useSound(Miss, {volume:1});
    const [playMiss2] = useSound(Miss, {volume:0.3});
    const [finish] = useSound(Finish, {volume:1});

    useEffect(()=>{
        console.log(players);
    },[])

    useEffectDebugger(()=>{
        if(table.startTime>0){
            if(!isStartFlg){
                var array = [];
                var id = 0;
                for(var key in players['players']){
                    if(key != "isGameStart"){
                        array.push({name:players['players'][key]["name"],score:players['players'][key]["score"],id:id});
                        id++;
                    }
                } 
                setPlayerInfo(array);

                const container = document.getElementsByClassName('container')[0];
                const circle = document.getElementsByClassName('circle')[0];
                const count = document.getElementsByClassName('count')[0];
                const count0 = document.getElementsByClassName('count0')[0];

                 // 新しいHTML要素を作成
                var new_element3 = document.createElement('p');
                new_element3.textContent = '3';
                var new_element2 = document.createElement('p');
                new_element2.textContent = '2';
                var new_element1 = document.createElement('p');
                new_element1.textContent = '1';

                // 指定した要素の中の末尾に挿入
                count.appendChild(new_element3);
                count.appendChild(new_element2);
                count.appendChild(new_element1);

                count0.textContent = '0';

                container.setAttribute("id", "container");
                circle.setAttribute("id", "circle");
                count.setAttribute("id", "count");
                count0.setAttribute("id", "count0");

                count0.addEventListener('animationend', () => {
                    // アニメーション終了後に実行する内容
                    count.innerHTML = '';
                    count0.innerHTML = '';
                    container.setAttribute("id", "");
                    circle.setAttribute("id", "");
                    count.setAttribute("id", "");
                    count0.setAttribute("id", "");
                    setIsStartFlg(true);
                })
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
        if(0 <= table.startTime){
            var w_playerInfo = playerInfo;
            for(var key1 in players['players']){
                var pname = players['players'][key1]["name"];
                for(var key2 in playerInfo){
                    if(playerInfo[key2]["name"]==pname){
                        w_playerInfo[key2]["score"] = players['players'][key1]["score"];
                    };
                }
            } 
            var array = w_playerInfo.map((p,i)=>{
                var id = "player" + i;
                return <div className={'playerGameSocre'} id={id}><span id="playername">{p["name"]}</span><span id="score">&nbsp;Score:{p["score"]}</span></div>
            })
            console.log(players['click_player']);
            if(players['click_player']['socketID'] == myself["socketID"]){
                if(players['click_player']['judge'] == 1){
                    playSuccess1();
                }else if(players['click_player']['judge'] == -1){
                    playMiss1();
                }
            }else{
                if(players['click_player']['judge'] == 1){
                    playSuccess2();
                }else if(players['click_player']['judge'] == -1){
                    playMiss2();
                }
            }
            setPlayerInfo(w_playerInfo);
            setPlayerScores(array);
        }else{
            var array = [];
            var array2 = [];
            var array3 = {};
            var keys = Object.keys(players['players']);
            if(0<=keys.indexOf('isGameStart')){
                keys.splice(keys.indexOf('isGameStart'),1)
            }
            for(var i = 0; i < keys.length;i++){
                console.log(myself);
                console.log(players['players'][keys[i]]);
                var id = "player" + i;
                var id2 = "ready" + i;
                array.push(<div className="playerGameSocre" id={id}><span id="playername">{players['players'][keys[i]]["name"]}</span><span id="score">&nbsp;Score:{players['players'][keys[i]]["score"]}</span></div>)
                var readyClass = "";
                
                if(players['players'][keys[i]]['ready']){
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
                var socketID = players['players'][keys[i]]['socketID'];
                array3[socketID] = players['players'][keys[i]]['ready']
                array2.push(<span className={readyClass} id={id2}></span>)
            }
            console.log(myself["socketID"]);
            for(var listID in readyList){
                for(var id in array3){
                    if(listID == id && readyList[listID] != array3[id]){
                        if(myself["socketID"] == listID){
                            playButton1();
                        }else{
                            playButton2();
                        }
                    }
                }
            }

            setPlayerScores(array);
            setPlayerIsReady(array2);
            setReadyList(array3);
        }
    },[players])
 
    const handleTileClick = useCallback((id) => {
        onTileClick(id);
    })

    const handleClickReady = () => {
        if(isReady){
            setIsReady(false);
            onButtonReady(false);
        }else{
            setIsReady(true);
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
            finish();
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
            <div className="container">
                <div className="circle"></div>
                <div className="count"></div>
                <div className="count0"></div>
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
                                    onClick={handleClickReady}
                                    disabled={table.startTime>0}>
                                        Ready?
                                </Button>
                            </div>
                        }
                    </div>
                }
            </div>
            <div className='bottomContext'>
                {playerScores[2]?playerScores[2]:<div className='playerGameSocre'/>}
                {playerScores[3]?playerScores[3]:<div className='playerGameSocre'/>}
            </div>
           
            
        </div>
    );
})

export default Game