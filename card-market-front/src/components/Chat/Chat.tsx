import Message from "../../models/message.model";
import MessageComponent from "../MessageComponent/MessageComponent";

type ChatProps = {
    messages: Message[]
}

const Chat = ({messages} : ChatProps) => {
    return (
        <>
        <h1>
            Chat
        </h1>
        {
            messages
            .sort((a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime())
            .map((message, index) => (
              <MessageComponent key={index} message={message} />
            ))
        }
        </>
    )
}

export default Chat;