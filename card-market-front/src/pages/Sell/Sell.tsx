import { useSelector } from "react-redux";
import CardList from "../../components/Cards/CardList";
import { StoreService } from "../../services/store.service";
import User from "../../models/user.model";
import { useState, Fragment } from "react";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";


const Sell = () => {
    const currentUser : User = useSelector((state: any) => state.userReducer.currentUser)
    const [open, setOpen] = useState(false);

    const handleCLick = async (cardId: any) => {
        try {
            const response = await StoreService.sell(cardId, currentUser.id)
            console.log(response)
            setOpen(true)
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
            <CardList fetchMethod="user" handleClick={handleCLick}/>
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