import { useState, Fragment } from "react";
import CardList from "../../components/Cards/CardList";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import User from "../../models/user.model";
import { useDispatch, useSelector } from "react-redux";
import { StoreService } from "../../services/store.service";
import { UserService } from "../../services/user.service";
import { CardService } from "../../services/card.service";
import CardProps from "../../models/CardProps";
import Alert from '@mui/material/Alert';
import CardPreview from "../../components/Cards/CardPreview";
import { Typography, Grid, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Buy = () => {
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser)
    const cards : CardProps[] = useSelector((state: any) => state.cardReducer.buyCards)
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null); // State for storing selected card

    const dispatch = useDispatch();

    const handleCLick = async (cardId: any) => {
        const response = await StoreService.buy(cardId, currentUser.id)
        if (response) {
            setOpen(true)
            setSelectedCard(null)
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
                    <CardList cards={cards} setSelectedCard={setSelectedCard} listTitle="Card to Buy"/>
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
                message="You just bought a card"
                TransitionComponent={Slide}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClose={handleClose}
                action={action}
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