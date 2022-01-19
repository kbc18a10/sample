import React,{useState} from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect} from 'react-router-dom';
import Operation from '../components/Operation';
import img_singleplay from '../images/Lobby/singleplay.png';
import img_multiplay from '../images/Lobby/multiplay.png';
import img_lobbyrule from '../images/Lobby/LobbyRule.png'

import '../css/Lobby.css'

const useStyles = makeStyles({
    playButton: {
        width:"400px",
        height:"400px",
        margin:"30px 100px 10px 100px"
    },
    lobbyRuleButton:{
        marginRight:"66px"
    }
  });
  
const Lobby = React.memo(({onChangeState, onSetName, name, myself, players}) => {
    const [flg,setFlg ] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    const classes = useStyles();

    const handleChangeStateSingle = () => {
        onChangeState("single");
        setFlg(true);
    }

    const handleChangeStateMulti = () => {
        onChangeState("multi");
        setFlg(true);
    }

    const handleChangeStateRule = () => {
        onChangeState("rule");
    }

    const handleSetName = (name) => {
        onSetName(name);
        setPlayerName(name);
    }

    return (
        <div className="Lobby"> 
            <div className="playerButtons">
                <Button
                    className={classes.playButton}
                    onClick={handleChangeStateSingle}
                    disabled={playerName.length == 0 || flg}
                >
                    <img className="playbutton" src={img_singleplay}></img>
                </Button>
                <Button
                    className={classes.playButton}
                    onClick={handleChangeStateMulti}
                    disabled={playerName.length == 0 || flg}
                >
                    <img className="playbutton" src={img_multiplay}></img>
                </Button>
            </div>
            {flg&&myself&&players&&<Redirect to="/game" />}
            <div className="bottomElems">
                <Operation onSetName={handleSetName} name={name}/>
                <Button
                    className={classes.lobbyRuleButton}
                    component={Link}
                    to='rule-description'
                    onClick={handleChangeStateRule}
                >
                    <img id="lobbyrule" src={img_lobbyrule}></img>
                </Button>
            </div>
        </div>
    );
})

export default Lobby