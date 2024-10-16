import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import './PageTitle.css';

interface PageTitleProps {
    description: string;
}

const PageTitle = ({ description }: PageTitleProps) => {
    const navigate = useNavigate();

    const user = null;

    const showDescription = () => {
        if (user) {
            return (description)
        } else {
            return ("Add an user")
        }
    }

    return (
        <>
            <div className="pagetitle-container">
                <Link className="link" component="button" underline="none" onClick={() => navigate("/home")}>
                    <HomeIcon />
                    Home
                </Link>
                <span>{showDescription()}</span>
            </div>
        </>
    )
}

export default PageTitle;

