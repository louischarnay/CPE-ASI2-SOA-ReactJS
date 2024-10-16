import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const UserComponent = () => {
    const navigate = useNavigate();

    return (<AccountCircleIcon onClick={() => navigate("/login")} />)
}

export default UserComponent;