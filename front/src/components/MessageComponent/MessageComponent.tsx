import { GlobalMessageReceived, PrivateMessageReceived } from "../../models/message.model";

type MessageProps = {
    message: PrivateMessageReceived | GlobalMessageReceived;
}

const MessageComponent = ({ message }: MessageProps) => {

    const formatTime = (date: Date) => {
        const myDate = new Date(date)
        const hours = String(myDate.getHours()).padStart(2, '0');
        const minutes = String(myDate.getMinutes()).padStart(2, '0');
        
        return `${hours}:${minutes}`;
      }

    return (
    <div>
        <span>{formatTime(message.date)}</span> - {message.userName} : {message.content}
    </div>)
}

export default MessageComponent;