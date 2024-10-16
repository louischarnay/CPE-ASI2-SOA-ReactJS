import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserComponent = () => {
    const navigate = useNavigate();

    return (
        <Link component="button" onClick={() => navigate("/login")}>
            <AccountCircleIcon />
        </Link>
    )
}

export default UserComponent;