import { useSelector } from "react-redux";
import CardList from "../../components/Cards/CardList";
import { CardService } from "../../services/card.service";
import { StoreService } from "../../services/store.service";
import User from "../../models/user.model";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';


const Sell = () => {
    const currentUser : User = useSelector((state: any) => state.userReducer.currentUser)
    const [open, setOpen] = React.useState(false);

    const handleCLick = async (cardId: any) => {
        try {

            const response = await StoreService.sell(cardId, currentUser.id)
            console.log(response)
            setOpen(true)

            
            // TODO NOTIF
        } catch (err) {
            console.log(err)
        }
    }

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
        ) => {
            if (reason === 'clickaway') {
            return;
            }
    
            setOpen(false);
        };
    
    return (
        <div>
            <CardList fetchMethod="user" handleClick={handleCLick}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You just sold your card"
                onClose={handleClose}
            />
        </div>
    );
}

export default Sell;