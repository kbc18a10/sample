import React, {useState, useEffect, useRef} from 'react';

const Operation = React.memo(({onSetName, name}) => {
    const [playerName, setName] = useState('');
    const textInput = useRef(null);

    useEffect(()=>{
        if(name){
            setName(name);
        }
        textInput.current.focus();
    },[]);

    const handleInputChange = (e) => {
        setName(e.target.value.substring(0,10));
        onSetName(e.target.value.substring(0,10))
    };

    return (
        <div className="input">
            <span id="playerName">PlayerName:</span>
            <input id="inputName" type="text" ref={textInput} placeholder="1～10文字で入力してください" value={playerName} onChange={handleInputChange}/>
        </div>
    );
})

export default Operation;