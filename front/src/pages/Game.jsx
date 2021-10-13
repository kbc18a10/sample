import React from 'react';
import {Link} from 'react-router-dom';


const Game = () => {
    return (
        <div className="Game"> 
            <h1>ゲーム画面</h1>
            <Link to="/result"><p>result</p></Link>
        </div>
    );
}

export default Game