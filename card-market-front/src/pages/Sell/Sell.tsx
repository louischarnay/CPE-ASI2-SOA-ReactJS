import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/Cards/CardList";
import { StoreService } from "../../services/store.service";
import User from "../../models/user.model";
import { useState, Fragment } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UserService } from "../../services/user.service";
import { CardService } from "../../services/card.service";
import CardProps from "../../models/CardProps";

const Sell = () => {
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser)
    const cards: CardProps[] = useSelector((state: any) => state.cardReducer.userCards)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCLick = async (cardId: any) => {
        try {
            const response = await StoreService.sell(cardId, currentUser.id)
            if (response) {
                setOpen(true)
                updateData(currentUser.id)

            }
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

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <div>
            <CardList fetchMethod="user" handleClick={handleCLick} cards={cards} />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You just sold your card"
                onClose={handleClose}
                action={action}
            />
        </div>
    );
}

export default Sell;