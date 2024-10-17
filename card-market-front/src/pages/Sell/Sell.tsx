import { useSelector } from "react-redux";
import CardList from "../../components/Cards/CardList";
import { CardService } from "../../services/card.service";
import { StoreService } from "../../services/store.service";
import User from "../../models/user.model";

const Sell = () => {
    const currentUser : User = useSelector((state: any) => state.userReducer.currentUser)

    const handleCLick = async (cardId: any) => {
        try {

            const response = await StoreService.sell(cardId, currentUser.id)
            console.log(response)
            
            // TODO NOTIF
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div>
            <CardList fetchMethod="user" handleClick={handleCLick}/>
        </div>
    );
}

export default Sell;