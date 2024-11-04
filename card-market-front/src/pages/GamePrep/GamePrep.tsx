import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/Cards/CardList";
import User from "../../models/user.model";
import { useState, Fragment } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { UserService } from "../../services/user.service";
import { CardService } from "../../services/card.service";
import CardProps from "../../models/CardProps";

const GamePrep = () => {
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser)
    const cards: CardProps[] = useSelector((state: any) => state.cardReducer.userCards)
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null); // State for storing selected card
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCLick = async (cardId: any) => {
        //TODO : Add to user set
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
        // Update between stock and game inventory

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
        <div style={{ display: 'flex'}}>
            <CardList fetchMethod="user" cards={cards} setSelectedCard={setSelectedCard} />
            <CardList fetchMethod="user" cards={cards} setSelectedCard={setSelectedCard}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="Your card is selected"
                onClose={handleClose}
                action={action}
            />
        </div>
    );
}

export default GamePrep;