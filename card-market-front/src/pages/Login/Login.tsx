import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>Login</h1>
            <Link component="button" onClick={() => navigate("/register")}>create new account</Link>
        </>
    )
}

export default Login;