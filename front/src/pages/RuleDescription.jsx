import React from 'react';
import {Link} from 'react-router-dom';

const RuleDescription = () => {
    return (
        <div className="RuleDescription"> 
            <h1>ルール説明画面</h1>
            <Link to="/lobby"><p>lobby</p></Link>
        </div>
    );
}

export default RuleDescription