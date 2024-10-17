import { useState } from "react";
import CardList from "../../components/Cards/CardList";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import User from "../../models/user.model";
import { useSelector } from "react-redux";
import { StoreService } from "../../services/store.service";

const Buy = () => {
    const [open, setOpen] = useState(false);
    const currentUser : User = useSelector((state: any) => state.userReducer.currentUser)

    const handleCLick = async (cardId: any) => {
        const response = await StoreService.buy(cardId, currentUser.id)
        console.log(response)
        setOpen(true)
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
            <CardList fetchMethod = "all" handleClick={handleCLick}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You just bought a card"
                onClose={handleClose}
            />
        </div>
    );
}

export default Buy;