import * as React from 'react';
import CardList from "../../components/Cards/CardList";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

const Sell = () => {
    const [open, setOpen] = React.useState(false);

    const handleCLick = async (id: any) => {
        const response = null
        setOpen(true)
    }
    
    return (
        <div>
            <CardList fetchMethod="user" handleClick={handleCLick}/>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                message="You just sold your card"
            />
        </div>
    );
}

export default Sell;