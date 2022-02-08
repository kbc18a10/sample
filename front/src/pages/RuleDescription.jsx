import React from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import useSound from 'use-sound';
import Sound from '../audio/button.mp3';
import img_ruleToLobby from '../images/RuleDescription/RuleLobby.png';
import '../css/RuleDescription.css'

const useStyles = makeStyles({
    button: {
        position:"absolute",
	    left:'230px',
	    bottom:'20px'
    }
  });
  
const RuleDescription = ({onChangeState}) => {
    const classes = useStyles();
    const [play] = useSound(Sound, {volume:1});

    const handleChangeState = () => {
        play();
        onChangeState("lobby");
    }

    return (
        <div className="RuleDescription"> 
            <Button
                className={classes.button}
                component={Link}
                to="/lobby"
                onClick={handleChangeState}
            >
                <img className="ruleToLobby" src={img_ruleToLobby}></img>
            </Button>
        </div>
    );
}

export default RuleDescription