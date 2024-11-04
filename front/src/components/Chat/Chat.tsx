import { Button, TextField } from "@mui/material";
import Message from "../../models/message.model";
import MessageComponent from "../MessageComponent/MessageComponent";
import { useEffect, useState } from "react";
import SocketService from "../../services/socker.service";

type ChatProps = {
    messages: Message[]
}

const Chat = ({ messages }: ChatProps) => {
    const [message, setMessage] = useState("");

    const socketService = new SocketService("http://localhost:4000");

    useEffect(() => {
        // Connect to the Socket.IO server when the component mounts
        socketService.connect();

        // Define a callback for incoming messages
        socketService.onMessage("message-receive", (data: string) => {
            alert(data);
        });

        // Clean up when the component unmounts
        return () => {
            socketService.disconnect();
        };
    }, []);

    const sendMessage = () => {
        socketService.sendMessage("message-send", {content: message, userId: 1});
        setMessage("");
    };

    return (
        <>
            <h1>Chat</h1>
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
                    onChange={(e) => setMessage(e.target.value)} // 🔄 Permet de mettre à jour l'état `message`
                />
                <Button variant="contained" onClick={sendMessage}>Send</Button>
            </div>
        </>
    );
}

export default Chat;
