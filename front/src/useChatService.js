import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';

const useChatService = (initialMessage) => {
    const [messages, setMessages] = useState([initialMessage]);
    const [name, setName] = useState("");

    const socketRef = useRef();

    useEffect(() => {
        console.log('Connectinng..');
        socketRef.current = io();
        socketRef.current.on('broadcast', payload => {
            console.log('Recieved: ' + payload);
            setMessages(prevMessages => [...prevMessages, payload]);
        });
        socketRef.current.on('someone_disconnect',payload => {
            console.log('Recieved: ' + payload);
            setMessages(prevMessages => [...prevMessages, payload]);
        })
        return () => {
            console.log('Disconnecting..');
            console.log(name);
            const msg = {name:name,text:"退室しました。"}; 
            socketRef.current.emit("client_to_server_personal", msg);
            setMessages(prevMessages => [...prevMessages, msg]);
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (name, text) => {
        setName(name);
        console.log(name);
        const aMessage = {
            name: name,
            text: text,
        };
        socketRef.current.emit('send', aMessage);
        setMessages(prevMessages => [...prevMessages, aMessage]);
    }

    return [messages, sendMessage];
}

export default useChatService;