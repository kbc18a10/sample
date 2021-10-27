import React from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

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
            <h1>ホーム画面</h1>
            <Button
                className={classes.button}
                component={Link}
                to="/lobby"
                onClick={handleChangeState}
            >
                ロビー画面へ
            </Button>
        </div>
    );
}

export default Home