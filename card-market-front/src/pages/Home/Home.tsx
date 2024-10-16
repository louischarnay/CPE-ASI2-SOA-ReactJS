import { Stack } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ScienceIcon from '@mui/icons-material/Science';
import HomeItem from "../../components/HomeItem/HomeItem";
import './Home.css'

const Home = () => {
    return (
        <div className="home-container">
        <Stack spacing={10} direction="row">
            <HomeItem icon={<AttachMoneyIcon/>} description="Sell" redirection="/sell/"/>
            <HomeItem icon={<ShoppingCartIcon/>} description="Buy" redirection="/buy/"/>
            <HomeItem icon={<ScienceIcon/>} description="Create" redirection="/create/"/>
        </Stack>
        </div>
    )
}

export default Home;