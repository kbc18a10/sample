import React, {useEffect, useState, useCallback} from 'react';
import {useEffectDebugger} from 'use-debugger-hooks';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link,Redirect} from 'react-router-dom';
import TileTalbe from '../components/TileTable';
import Time from '../components/Time';

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
  

const Game = React.memo(({players, onChangeState,state,name, onTileClick, onButtonReady, table}) => {
    const classes = useStyles();
    const [isReady,setIsReady] = useState(false);
    const [flg, setFlg] = useState(false);
    const [playerScores, setPlayerScores] = useState("unoe");

    useEffectDebugger(()=>{
        var array = [];
        for(var key in players){
            if(key != "isGameStart"){
                array.push({name:players[key]["name"],score:players[key]["score"]});
            }
        } 
        console.log(array);
        var array2 = array.map((p)=>{
            return <div className="playerscore"><p>{p["name"]}</p><p>{p["score"]}</p></div>
        })
        setPlayerScores(array2);
    },[players])
 
    const handleChangeState = () => {
        if(state == "single"){
            onChangeState("singleResult");
        }else{
            onChangeState("multiResult");
        }
    }

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
        console.log(flg);
        if(flg){
            setFlg(flg);
        }
    }

    return (
        <div className="Game"> 
            {!players && <Redirect to="/"/>}
            {table && <Time gameEnd={(flg)=>handleGameEnd(flg)}/>}
            {flg&&<Redirect to="/result" />}
            name:{name}
            {table && <TileTalbe className={classes.TileTable} onTileClick={(id) => handleTileClick(id)} table={table}/>}
            <Button
                className={classes.button}
                component={Link}
                to="/result"
                onClick={handleChangeState}
            >
                result
            </Button>
            {playerScores[0]}
            {playerScores[1]}
            {playerScores[2]}
            {playerScores[3]}
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