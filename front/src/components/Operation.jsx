import {useState, useEffect} from 'react';

const Operation = ({onSetName, name}) => {
    const [playerName, setName] = useState('');
    useEffect(()=>{
        if(name){
            setName(name);
        }
    });

    const handleInputChange = (e) => {
        setName(e.target.value.substring(0,8));
        onSetName(e.target.value.substring(0,8))
    };

    return (
        <div className="input">
            <input type="text" placeholder="1～8文字で入力してください" value={playerName} onChange={handleInputChange}/>
        </div>
    );
}

export default Operation;