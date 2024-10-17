import { useState } from "react";
import CardList from "../../components/Cards/CardList";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

const Buy = () => {
    const [open, setOpen] = useState(false);

    const handleCLick = (e: any) => {
        console.log("carte à acheter")
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