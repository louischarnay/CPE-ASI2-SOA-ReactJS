import Message from "../../models/message.model";

type MessageProps = {
    message: Message;
}

const MessageComponent = ({ message }: MessageProps) => {

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${hours}:${minutes}`;
      }

    return (
    <div>
        <span>{formatTime(message.date)}</span> - {message.userName} : {message.content}
    </div>)
}

export default MessageComponent;