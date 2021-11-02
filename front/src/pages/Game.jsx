import React, {useState} from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import TileTalbe from '../components/TileTable';
import {useEffectDebugger} from 'use-debugger-hooks';

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
  

const Game = ({onChangeState,state,name, onTileClick, onButtonReady, table}) => {
    const classes = useStyles();
    const [isReady,setIsReady] = useState(false);
 
    const handleChangeState = () => {
        if(state == "single"){
            onChangeState("singleResult");
        }else{
            onChangeState("multiResult");
        }
    }

    const handleTileClick = (id) => {
        onTileClick(id);
    }

    const handleClickReady = () => {
        if(isReady){
            setIsReady(false)
            onButtonReady(false);
        }else{
            setIsReady(true)
            onButtonReady(true);
        }
    }

    useEffectDebugger(() => {
        if(table){
          console.log(table);
        }
    },[table]);


    return (
        <div className="Game"> 
            <h1>ゲーム画面</h1>
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
            ready?
            <Button
                className={isReady?classes.readyButton:classes.notReadyButton}
                onClick={handleClickReady}
            />
            
        </div>
    );
}

export default Game