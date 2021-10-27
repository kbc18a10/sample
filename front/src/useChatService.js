import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';

const useChatService = (initialMessage) => {
    const [messages, setMessages] = useState([initialMessage]);
    const [name, setName] = useState([initialMessage][0]["name2"]);
    const [player, setPlayer] = useState();
    const [socketID, setSocketID] = useState();

    const socketRef = useRef();

    useEffect(() => {
        console.log('Connecting..');
        console.log('io()')
        socketRef.current = io();
       // const msg = {name:name,text:"入室しました。"}; 
       // console.log('emit join_room')
       // socketRef.current.emit('join_room',msg);
        console.log('emit addnewPlayer')
        socketRef.current.emit('addnewplayer', {name:name});
       
        socketRef.current.on('playerFull',m=>{
            console.log('on playerFull')
            console.log(m);
            socketRef.current.disconnect();
        })

        socketRef.current.on('mySocketID',data => {
            console.log('on mySocketID')
            console.log("mySocketID");
            console.log(data);
            setSocketID(data.socketID);
            const player = {
                socketID: data.socketID,
                name: name  
            }
            setPlayer(player);
            console.log(player)
        })
        
        socketRef.current.on('broadcast', payload => {
            console.log('on broadcast')
            console.log('Recieved: ' + payload);
            setMessages(prevMessages => [...prevMessages, payload]);
        });
        
        socketRef.current.on('someone_disconnect',payload => {
            console.log('on someone_disconnect')
            console.log('Recieved: ' + payload);
            setMessages(prevMessages => [...prevMessages, payload]);
        })
        
        return () => {
            console.log('Disconnecting..');
            const msg = {name:name,text:"退室しました。"}; 
            console.log('emit client_to_server_personal')
            socketRef.current.emit("client_to_server_personal", msg);
            setMessages(prevMessages => [...prevMessages, msg]);
            console.log('disconnect()')
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (name, text) => {
        const aMessage = {
            name: name,
            text: text,
        };
        console.log('emit send')
        socketRef.current.emit('send', aMessage);
        setMessages(prevMessages => [...prevMessages, aMessage]);
    }

    return [messages, sendMessage];
}

export default useChatService;