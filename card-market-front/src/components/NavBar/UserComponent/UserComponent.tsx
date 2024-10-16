import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import './UserComponent.css'

const UserComponent = () => {
    const navigate = useNavigate();

    const currentUser = useSelector((state: any) => state.userReducer.currentUser)

    return (
        <>
            {currentUser ? (
                <div className='header-top'>
                    <div className='first-part'>
                        <Link component="button" onClick={() => navigate("/login")}>
                            <AccountCircleIcon />
                        </Link>
                        <span><b>{currentUser.surName}</b></span>
                        <Link component="button" onClick={() => navigate("/register")}>
                            <AddIcon />
                        </Link>
                    </div>
                    <span>{currentUser.account}€</span>
                </div>
            ) : (
                <Link component="button" onClick={() => navigate("/login")}>
                    <AccountCircleIcon />
                </Link>
            )}
        </>
    )
}

export default UserComponent;