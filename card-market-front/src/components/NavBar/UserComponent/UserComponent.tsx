import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserComponent = () => {
    const navigate = useNavigate();

    const currentUser = useSelector((state: any) => state.userReducer.currentUser)

    return (
        <>
            {currentUser ? (
                <div className='header-top'>
                    <div>

                    <Link component="button" onClick={() => navigate("/login")}>
                        <AccountCircleIcon />
                    </Link>
                    <span><b>{currentUser.surName}</b></span>
                    </div>
                    <span>{currentUser.account}€</span>
                </div>
            ) : (
                // Sinon, afficher un bouton pour rediriger vers la page de login
                <Link component="button" onClick={() => navigate("/login")}>
                    <AccountCircleIcon />
                </Link>
            )}
        </>
    )
}

export default UserComponent;