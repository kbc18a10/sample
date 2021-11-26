import tileimg1 from '../images/tile1.png';
import tileimg2 from '../images/tile2.png';
import tileimg3 from '../images/tile3.png';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import React,{useState} from 'react';

const useStyles = makeStyles({
    type0:{
        minWidth:'25px',
        width:"25px",
        height:"25px",
        display:"inline-block"
    },
    type1: {
        backgroundImage: `url(${tileimg1})`,
        minWidth:'25px',
        width:"25px",
        height:"25px",
        display:"inline-block"
    },
    type2: {
        backgroundImage: `url(${tileimg2})`,
        minWidth:'25px',
        width:"25px",
        height:"25px",
        display:"inline-block"
    },
    type3: {
        backgroundImage: `url(${tileimg3})`,
        minWidth:'25px',
        width:"25px",
        height:"25px",
        display:"inline-block"
    }
  });


const Tile = React.memo(({id, type, onTileClick}) => {
    const classes = useStyles();

    const handleClicked = (e) => {
        onTileClick(e.currentTarget.id);
        console.log("button clicked");
    }

    const tile = () => {
        console.log("renderされました");
        if(type == 0){
            return <Button className={classes.type0} id={id} onClick={handleClicked} />
        }else if(type == 1){
            return <Button className={classes.type1} id={id} onClick={handleClicked} />
        }else if(type == 2){
            return <Button className={classes.type2} id={id} onClick={handleClicked} />
        }else if(type == 3){
            return <Button className={classes.type3} id={id} onClick={handleClicked} />
        }
    } 
    
    return <div className="tile">{tile()}</div>
})

export default Tile;