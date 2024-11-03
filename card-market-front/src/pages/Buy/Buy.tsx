import { useState } from "react";
import CardList from "../../components/Cards/CardList";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import User from "../../models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { StoreService } from "../../services/store.service";
import { UserService } from "../../services/user.service";
import { CardService } from "../../services/card.service";
import CardProps from "../../models/CardProps";
import Alert from '@mui/material/Alert';

const Buy = () => {
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser)
    const cards : CardProps[] = useSelector((state: any) => state.cardReducer.buyCards)

    const dispatch = useDispatch();

    const handleCLick = async (cardId: any) => {
        const response = await StoreService.buy(cardId, currentUser.id)
        if (response) {
            setOpen(true)
            updateData(currentUser.id)
        } else {
            setOpenError(true)
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

    const handleCloseError = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    const updateData = async (userId: number) => {
        const user = await UserService.getUserById(userId)
        dispatch({
            type: 'UPDATE_CURRENT_USER',
            payload: user
        })

        const userCards = await CardService.getUserCards(userId)
        dispatch({
            type: 'UPDATE_USER_CARDS',
            payload: userCards
        })

        const cards = await CardService.getAllCards()
        dispatch({
            type: 'UPDATE_BUY_CARDS',
            payload: cards
        })
    }

    return (
        <div>
            <CardList fetchMethod="all" handleClick={handleCLick} cards={cards}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You just bought a card"
                onClose={handleClose}
            />
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Not enough money on the account
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Buy;