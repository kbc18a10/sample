import React from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Tile from '../components/Tile';

const useStyles = makeStyles({
    button: {
        backgroundColor:'primary'
    }
  });
  

const Game = ({onChangeState,state,name, onButtonClick}) => {
    const classes = useStyles();
 
    const handleChangeState = () => {
        if(state == "single"){
            onChangeState("singleResult");
        }else{
            onChangeState("multiResult");
        }
    }

    const handleEmitNameToServer = () => {

    }

    const handleButtonClick = (id) => {
        onButtonClick(id);
    }

    return (
        <div className="Game"> 
            <h1>ゲーム画面</h1>
            name:{name}
            <Tile name={name} onButtonClick={(id) => handleButtonClick(id)}/>
            <Button
                className={classes.button}
                component={Link}
                to="/result"
                onClick={handleChangeState}
            >
                result
            </Button>
            <Button
                className={classes.button}
                onClick={handleEmitNameToServer}
            >
                emit name
            </Button>
        </div>
    );
}

export default Game