import { useState, useCallback } from "react";
import Chat from "./Chat";
import { useDispatch } from "react-redux";

const ChatMenu = () => {
    const [typeChat, setTypeChat] = useState("global");
    const dispatch = useDispatch();

    const updateTypeChat = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTypeChat(e.target.value);
        // D'abord, on vide les messages
        dispatch({ type: 'EMPTY_MESSAGES' });
        
        // Ensuite, on réinitialise le targetId si on passe en mode privé
        if (e.target.value === "private") {
            dispatch({ type: 'UPDATE_TARGET_ID', payload: 0 });
        }
        
        // Enfin, on met à jour le type de chat
    }, [dispatch]);

    return (
        <div className="chat-container">
            <div className="chat-type-selector">
                <div className="radio-group">
                    <div className="radio-option">
                        <input
                            type="radio"
                            name="typeChat"
                            id="typeChatGlobal"
                            value="global"
                            onChange={updateTypeChat}
                            checked={typeChat === "global"}
                        />
                        <label htmlFor="typeChatGlobal">Global Chat</label>
                    </div>

                    <div className="radio-option">
                        <input
                            type="radio"
                            name="typeChat"
                            id="typeChatPrivate"
                            value="private"
                            onChange={updateTypeChat}
                            checked={typeChat === "private"}
                        />
                        <label htmlFor="typeChatPrivate">Private Chat</label>
                    </div>
                </div>
            </div>

            <Chat typeChat={typeChat} />
        </div>
    );
};

export default ChatMenu;