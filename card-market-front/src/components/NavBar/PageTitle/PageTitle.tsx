import { Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import './PageTitle.css';
import User from "../../../models/user.model";

type NavbarProps = {
    currentUser: User;
}

const PageTitle = ({currentUser} : NavbarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const showTitle = () => {
        switch (location.pathname) {
            case '/home' : 
                return (<span>Select your action</span>)
            case '/buy' : 
                return (<span>BUY a card to complete your deck</span>)
            case '/sell' : 
                return (<span>SELL your cards to get money</span>)
            case '/create' : 
                return (<span>Generate a card</span>)
            default : 
                return (<span>Add an user</span>)
        }
    }

    return (
        <>
            <div className="pagetitle-container">
                <Link className="link" component="button" underline="none" onClick={() => navigate("/home")}>
                    <HomeIcon />
                    Home
                </Link>
                {
                    currentUser ? (showTitle()) : (<span>Add an user</span>)
                    }
            </div>
        </>
    )
}

export default PageTitle;

