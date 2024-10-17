import * as React from 'react';
import CardList from "../../components/Cards/CardList";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

const Buy = () => {
    const [open, setOpen] = React.useState(false);

    const handleCLick = (e: any) => {
        console.log("carte à acheter")
        setOpen(true)
    }
    
    return (
        <div>
            <CardList fetchMethod = "all" handleClick={handleCLick}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You just bought a card"
            />
        </div>
    );
}

export default Buy;