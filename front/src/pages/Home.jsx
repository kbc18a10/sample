import React from 'react';
import {Link} from 'react-router-dom';

const Home = (/*{onHome}*/) => {
/*
    const handleSetIsHome = () => {
        onHome(false);
    }
*/
    return (
        <div className="Home"> 
            <h1>ホーム画面</h1>
            {/*<Link to="/lobby" onClick={handleSetIsHome}>ロビー画面へ</Link>*/}
            <Link to="/lobby">ロビー画面へ</Link>
        </div>
    );
}

export default Home