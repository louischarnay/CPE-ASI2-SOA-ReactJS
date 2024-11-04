import Chat from "../../components/Chat/Chat";
import Message from "../../models/message.model";

const Match = () => {
    function dateMoinsUneMinute(date: Date) {
        const nouvelleDate = new Date(date);
        nouvelleDate.setMinutes(nouvelleDate.getMinutes() - 1);
        return nouvelleDate;
      }

    const messages : Message[] = [
        {
            content: "Salut bon match",
            userName: "Zozo l'Asticot",
            date: new Date()
        },
        {
            content: "gl hf",
            userName: "Pineur2raie",
            date: dateMoinsUneMinute(new Date())
        }
    ]

    return (
        <Chat messages={messages}/>
    )
}

export default Match;