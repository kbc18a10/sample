import React from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    button: {
    }
  });
  

const Result = ({onChangeState,name}) => {
    const classes = useStyles();

    const handleChangeStateHome = () => {
        onChangeState("home");
    }

    const handleChangeStateLobby = () => {
        onChangeState("lobby");
    }

    return (
        <div className="Result"> 
            <h1>結果画面</h1>
            name:{name}
            <Button
                className={classes.button}
                component={Link}
                to="/"
                onClick={handleChangeStateHome}
            >
                home
            </Button>
            <Button
                className={classes.button}
                component={Link}
                to="/lobby"
                onClick={handleChangeStateLobby}
            >
                lobby
            </Button>
        </div>
    );
}

export default Result