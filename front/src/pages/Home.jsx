import React from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import homeLogo from "../images/homeLogo.png"
import homeLogo2 from "../images/homeLogo2.png"
import "../css/Home.css"

const useStyles = makeStyles({
    button: {
    }
  });
  

const Home = ({onChangeState}) => {
    const classes = useStyles();

    const handleChangeState = () => {
        onChangeState("lobby");
    }

    return (
        <div className="Home"> 
            <div id="homelogo">
                <img src={homeLogo} width="600" height="250"/>
            </div>           
            <Button
                className={classes.button}
                component={Link}
                to="/lobby"
                onClick={handleChangeState}
            >
                <img src={homeLogo2}width="200" height="100"/>
            </Button>
        </div>
    );
}

export default Home