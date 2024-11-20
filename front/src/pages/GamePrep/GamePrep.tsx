import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/Cards/CardList";
import { useState, Fragment, useEffect } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardProps from "../../models/CardProps";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { socket } from "../../socket/socket";
import User from "../../models/user.model";
import "./GamePrep.css";
import PlayerCards from "../../components/Game/PlayerCards";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../socket/socketContext";

const GamePrep = () => {
    const {socket} = useSocket();
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);
    const cards: CardProps[] = useSelector((state: any) => state.cardReducer.userCards)
    const [tempUserCards, setTempUserCards] = useState<CardProps[]>([]);
    const [gameCards, setGameCards] = useState<CardProps[]>([]);
    const [open, setOpen] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    //const dispatch = useDispatch();

    const [loadingTextContent, setLoadingTextContent] = useState<string>("Joining Queue...");

    function onQueueJoined() {
        console.log("Queue joined");
        setLoadingTextContent("Waiting for other players...");
    }

    function onQueueLeft() {
        console.log("Queue left");
    }

    useEffect(() => {
        if(!socket) return;

        // Setup cards lists
        setTempUserCards([]);
        setGameCards([]);
        setTempUserCards(cards);

        //socket.open();

        //socket.emit('register', currentUser.id);

        // Setup socket
        socket.on("joined-queue", onQueueJoined);
        socket.on("left-queue", onQueueLeft);
        socket.on("created-room", (room: any) => {
            console.log("Room created: " + room.id);
            console.log("Players: " + room.player1.id + " and " + room.player2.id);
            console.log("Starting game...");
            // Update data
            //updateData(currentUser.id);
            // Redirect to game
            //history.push("/game");
            handleNavigate();
        });
        return () => {
            socket.off("joined-queue", onQueueJoined);
            socket.off("left-queue", onQueueLeft);
        };
    }, [socket, currentUser.id]);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/game");
    }

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

    const handleJoinGame = () => {
        if(!socket) return;
        // Join game
        // Check card number
        if(gameCards.length !== 4) {
            setOpen(true);
            return;
        }

        setOpenBackdrop(true);
        console.log("Joining game as player " + currentUser.id);
        socket.emit("join-queue", { id: currentUser.id, cards: gameCards.map(card => card.id) });
        console.log("Joining queue");
    }

    const handleCancelJoin = () => {
        if(!socket) return;
        setOpenBackdrop(false);
        socket.emit("leave-queue", { id: currentUser.id });
    }


    /*const updateData = async (userId: number) => {
        // Update between stock and game inventory
    }*/

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
        <div style={{ display: 'flex', gap: "20px"}}>
            <CardList cards={tempUserCards} setSelectedCard={handleAddClick} listTitle="My Cards"/>
            <CardList cards={gameCards} setSelectedCard={handleRemoveClick} listTitle="Game Cards"/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You have reach the maximum amount of cards"
                TransitionComponent={Slide}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClose={handleClose}
                action={action}
            >
            <Alert severity="error">
                You have reach the maximum amount of cards
            </Alert>
            </Snackbar>
        </div>
        <div className="button-container">
            <Button variant="contained" color="success" onClick={handleJoinGame}>
                Join Game
            </Button>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop}
                onClick={handleClose}
            >
                <div className="backdrop-container">
                    <PlayerCards cards={gameCards} />
                    <CircularProgress color="inherit" />
                    <p>{loadingTextContent}</p>
                    <Button className="backdrop-cancelButton" variant="contained" color="error" onClick={handleCancelJoin}>
                        Cancel
                    </Button>
                </div>
            </Backdrop>
        </div>
        </div>
    );
}

export default GamePrep;