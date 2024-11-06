import { useState } from "react";
import Chat from "./Chat";
import { useDispatch } from "react-redux";

const ChatMenu = () => {
    const [typeChat, setTypeChat] = useState("global");
    const dispatch = useDispatch();

    const updateTypeChat = (e: any) => {

        setTypeChat(e.target.value);
        dispatch({
            type: 'EMPTY_MESSAGES',
            payload: []
        })
    }

    return (
        <>
            <input
                type="radio"
                name="typeChat"
                id="typeChatGlobal"
                value="global"
                onChange={updateTypeChat}
                checked={typeChat === "global"}
            /> 
            <label htmlFor="typeChatGlobal">global</label>

            <input
                type="radio"
                name="typeChat"
                id="typeChatPrivate"
                value="private"
                onChange={updateTypeChat}
                checked={typeChat === "private"}
            /> 
            <label htmlFor="typeChatPrivate">private</label>

            <Chat typeChat={typeChat}></Chat>
        </>
    );
}

export default ChatMenu;
