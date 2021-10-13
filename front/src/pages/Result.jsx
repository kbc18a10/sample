import React from 'react';
import {Link} from 'react-router-dom';


const Result = () => {
    return (
        <div className="Result"> 
            <h1>結果画面</h1>
            <Link to="/home"><p>home</p></Link>
            <Link to="/lobby"><p>lobby</p></Link>
        </div>
    );
}

export default Result