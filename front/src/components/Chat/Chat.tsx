import { Button, TextField } from "@mui/material";
import Message from "../../models/message.model";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import User from "../../models/user.model";
import { useSelector } from "react-redux";

type ChatProps = {
    typeChat: string
}

const Chat = ({ typeChat }: ChatProps) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([] as Message[]);
    const [isConnected, setIsConnected] = useState(socket.connected);

    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser)

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onMessageReceived(value: Message) {
            console.log(value)
            setMessages((prevMessages) => [...prevMessages, value]); 
            console.log(messages)
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message-receive', onMessageReceived);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message-receive', onMessageReceived);
        };
    }, []);


    const sendMessage = () => {
        socket.emit('message-send', { content: message, userId: currentUser.id });
    };

    return (
        <>
            <h1>Chat</h1>
            <p>{typeChat}</p>
            {messages
                .sort((a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime())
                .map((message, index) => (
                    <MessageComponent key={index} message={message} />
                ))
            }

            <div>
                <TextField
                    id="filled-basic"
                    label="Send a message"
                    variant="filled"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button variant="contained" onClick={sendMessage}>Send</Button>
            </div>
        </>
    );
}

export default Chat;
