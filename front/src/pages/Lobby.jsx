import React from 'react';
import {Link} from 'react-router-dom';

const Lobby = () => {
    return (
        <div className="Lobby"> 
            <h1>ロビー画面</h1>
            <Link to="/game"><p>single play</p></Link>
            <Link to="/game"><p>multi play</p></Link>
            <Link to="/rule-description"><p>rule description</p></Link>
        </div>
    );
}

export default Lobby