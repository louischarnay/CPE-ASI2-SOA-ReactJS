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
import CardPreview from "../../components/Cards/CardPreview";
import { Typography, Grid, Box } from '@mui/material';

const Sell = () => {
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser)
    const cards: CardProps[] = useSelector((state: any) => state.cardReducer.userCards)
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null); // State for storing selected card
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCLick = async (cardId: any) => {
        try {
            const response = await StoreService.sell(cardId, currentUser.id)
            if (response) {
                setOpen(true)
                setSelectedCard(null)
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
            <Grid container spacing={3} style={{ padding: '20px' }}>
                {/* Left side card table */}
                <Grid item xs={12} md={9} style={{ width: '70%' }}>
                    <CardList fetchMethod="user" cards={cards} setSelectedCard={setSelectedCard} />
                </Grid>
            
                {/* Right side card preview */}
                <Grid item xs={12} md={3} style={{ width: '30%', position: 'relative' }}>
                    {selectedCard ? (
                        <Box
                            sx={{
                                position: 'fixed',
                                top: '50%',
                                right: '5%',
                                transform: 'translateY(-50%)',
                                width: 'calc(20% - 40px)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <CardPreview
                                handleCLick={handleCLick}
                                affinity={selectedCard.affinity}
                                attack={selectedCard.attack}
                                defence={selectedCard.defence}
                                description={selectedCard.description}
                                energy={selectedCard.energy}
                                family={selectedCard.family}
                                hp={selectedCard.hp}
                                id={selectedCard.id}
                                imgUrl={selectedCard.imgUrl}
                                name={selectedCard.name}
                                price={selectedCard.price}
                                smallImgUrl={selectedCard.smallImgUrl}
                                userId={selectedCard.userId}
                                isClickable={true}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                position: 'fixed',
                                top: '50%',
                                right: '5%',
                                transform: 'translateY(-50%)',
                                width: 'calc(20% - 40px)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6" align="center">
                                Cliquez sur une carte pour voir les détails
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You just sold a card"
                onClose={handleClose}
                action={action}
            />
        </div>
    );
}

export default Sell;