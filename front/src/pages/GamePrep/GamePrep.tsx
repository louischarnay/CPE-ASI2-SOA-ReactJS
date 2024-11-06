import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/Cards/CardList";
import { useState, Fragment, useEffect } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardProps from "../../models/CardProps";

const GamePrep = () => {
    const cards: CardProps[] = useSelector((state: any) => state.cardReducer.userCards)
    const [tempUserCards, setTempUserCards] = useState<CardProps[]>([]);
    const [gameCards, setGameCards] = useState<CardProps[]>([]);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setTempUserCards([]);
        setGameCards([]);

        setTempUserCards(cards);
    }, [cards]);

    const handleAddClick = (Card: CardProps) => {
        if(gameCards.length >= 4) {
            setOpen(true);
            return;
        }
        setTempUserCards(tempUserCards.filter(card => card.id !== Card.id));
        setGameCards(gameCards.concat(Card));
    }

    const handleRemoveClick = (Card: CardProps) => {
        setGameCards(gameCards.filter(card => card.id !== Card.id));
        setTempUserCards(tempUserCards.concat(Card));
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
        <div style={{ display: 'flex', gap: "20px"}}>
            <CardList fetchMethod="user" cards={tempUserCards} setSelectedCard={handleAddClick} />
            <CardList fetchMethod="user" cards={gameCards} setSelectedCard={handleRemoveClick}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You have reach the maximum amount of cards"
                onClose={handleClose}
                action={action}
            />
        </div>
    );
}

export default GamePrep;