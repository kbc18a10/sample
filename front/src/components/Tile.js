import tileimg from '../images/tile.png';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import {useState} from 'react';

const styles = {
    button: {
        backgroundImage: `url(${tileimg})`
       // backgroundColor:'primary'
    }
  };


const Tile = ({name, onButtonClick}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [domination, setDomination] = useState("domination");

    const handleClicked = (e) => {
        setDomination(name);
        onButtonClick(e.currentTarget.id);
    }
    
    return(
        <>
        <Button 
            id='tile1'
            style={styles.button}
            onClick={handleClicked}
            >
            {domination}
        </Button>
        </>
    )
}

export default Tile;