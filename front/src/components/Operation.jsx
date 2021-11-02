import {useState, useEffect, useRef} from 'react';

const Operation = ({onSetName, name}) => {
    const [playerName, setName] = useState('');
    const textInput = useRef(null);

    useEffect(()=>{
        if(name){
            setName(name);
        }
        textInput.current.focus();
    },[]);

    const handleInputChange = (e) => {
        setName(e.target.value.substring(0,8));
        onSetName(e.target.value.substring(0,8))
    };

    return (
        <div className="input">
            <input type="text" ref={textInput} placeholder="1～8文字で入力してください" value={playerName} onChange={handleInputChange}/>
        </div>
    );
}

export default Operation;