import tileimg1 from '../images/Game/tile1.png';
import tileimg2 from '../images/Game/tile2.png';
import tileimg3 from '../images/Game/tile3.png';
import tileimg4 from '../images/Game/tile4.png';
import tileimg5 from '../images/Game/tile5.png';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import React,{useState} from 'react';

const useStyles = makeStyles({
    type0:{
        minWidth:'26px',
        width:"26px",
        height:"26px",
        display:"inline-block",
        margin:"2px"
    },
    type1: {
        backgroundImage: `url(${tileimg1})`,
        minWidth:'26px',
        width:"26px",
        height:"26px",
        display:"inline-block",
        margin:"2px"
    },
    type2: {
        backgroundImage: `url(${tileimg2})`,
        minWidth:'26px',
        width:"26px",
        height:"26px",
        display:"inline-block",
        margin:"2px"
    },
    type3: {
        backgroundImage: `url(${tileimg3})`,
        minWidth:'26px',
        width:"26px",
        height:"26px",
        display:"inline-block",
        margin:"2px"
    },
    type4: {
        backgroundImage: `url(${tileimg4})`,
        minWidth:'26px',
        width:"26px",
        height:"26px",
        display:"inline-block",
        margin:"2px"
    },
    type5: {
        backgroundImage: `url(${tileimg5})`,
        minWidth:'26px',
        width:"26px",
        height:"26px",
        display:"inline-block",
        margin:"2px"
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
        }else if(type == 4){
            return <Button className={classes.type4} id={id} onClick={handleClicked} />
        }else if(type == 5){
            return <Button className={classes.type5} id={id} onClick={handleClicked} />
        }
    } 
    
    return <div className="tile">{tile()}</div>
})

export default Tile;