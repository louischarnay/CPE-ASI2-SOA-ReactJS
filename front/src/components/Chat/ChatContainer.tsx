import { useEffect, useState } from "react";
import Chat from "./Chat";
import "./Chat.css"
import ChatSelector from "./ChatSelector";
import ChatSender from "./ChatSender";
import User from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { useSelector } from "react-redux";

const ChatContainer = () => {

    const [targetList, setTargetList] = useState<User[]>([]);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);

    const getTargets = async () => {
        const targets: User[] = await UserService.getAllUsers();
        setTargetList(targets.filter(target => target.id !== currentUser.id)); // Filtrer l'utilisateur courant
    };

    useEffect(() => {
        getTargets();
    }, [])

    return (
        <>
            <div>
                <ChatSelector targetList={targetList} />
                <Chat />
            </div>
            <ChatSender />
        </>
    );
};

export default ChatContainer;