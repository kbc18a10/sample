import React from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    button: {
    }
  });
  
const RuleDescription = ({onChangeState}) => {
    const classes = useStyles();

    const handleChangeState = () => {
        onChangeState("lobby");
    }

    return (
        <div className="RuleDescription"> 
            <h1>ルール説明画面</h1>
            <Button
                className={classes.button}
                component={Link}
                to="/lobby"
                onClick={handleChangeState}
            >
                lobby
            </Button>
        </div>
    );
}

export default RuleDescription