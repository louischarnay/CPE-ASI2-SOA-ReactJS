import { Button, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../../models/user.model";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user: User = {
        "id": 2,
        "login": "nathan",
        "pwd": "password",
        "account": 0,
        "lastName": "Guillemette",
        "surName": "Nathan",
        "email": "nathan@guillemette.fr",
        "cardList": []
    }

    const setUser = () => {
        dispatch({
            type: 'UPDATE_CURRENT_USER',
            payload: user
        })
    }

    return (
        <>
            <h1>Login</h1>
            <Button onClick={() => setUser()}>
                Connect
            </Button>
            <Link component="button" onClick={() => navigate("/register")}>create new account</Link>
        </>
    )
}

export default Login;