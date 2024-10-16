import { Stack } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ScienceIcon from '@mui/icons-material/Science';
import HomeItem from "../../components/HomeItem/HomeItem";

const Home = () => {
    return (
        <>Léon ❤️
        <Stack spacing={2} direction="row">
            <HomeItem icon={<AttachMoneyIcon/>} description="Sell" redirection="sell"/>
            <HomeItem icon={<ShoppingCartIcon/>} description="Buy" redirection="buy"/>
            <HomeItem icon={<ScienceIcon/>} description="Create" redirection="create"/>
        </Stack>
        </>
    )
}

export default Home;