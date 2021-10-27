import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';

const Chat = ({name}) => {
    const [players, setPlayers] = useState();
    const [myself, setMyself] = useState();

    const socketRef = useRef();

    useEffect(() => {
        console.log('Connectinng..');
        socketRef.current = io();
/*
        socketRef.current.on('connectsocket',(msg) => {
            console.log('CONNECT:' + msg['name']);
        })
        */
        socketRef.current.emit('join_player',name);

        socketRef.current.on('get_players',players => {
            console.log('get_players');
            setPlayers(players);
            console.log(players);
        })

        socketRef.current.on('get_myself',myself => {
            console.log('get_myself');
            setMyself(myself);
            console.log(myself);
        })
        
        ///////////////////////////////
        /*
        socketRef.current.on('broadcast', payload => {
            console.log('Recieved: ' + payload);
            setMessages(prevMessages => [...prevMessages, payload]);
        });
        */
        /////////////////////////////////

        return () => {
            console.log('Disconnecting..');
            socketRef.current.disconnect();
        };
    }, []);

///////////////////////////////////////////////////
/*
const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleButtonClick = (e) => {
        const aMessage = {
            name:name,
            text:text,
        };
        socketRef.current.emit('send',aMessage);
        setMessages(prevMessages => [...prevMessages, aMessage]);
        setText('');
    }
    */
    ////////////////////////////////////////////////

    return(
        <div>
            player
            {JSON.stringify(players)}
            <br/>
            myself
            <br/>
            {JSON.stringify(myself)}

        </div>
    )
}

export default Chat;