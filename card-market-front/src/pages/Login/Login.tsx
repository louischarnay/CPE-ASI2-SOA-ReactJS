import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import User from "../../models/user.model";
import CardProps from "../../models/CardProps";
import { CardService } from "../../services/card.service";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        password: '',
    });
    const [openError, setOpenError] = useState(false);

    const handleCloseError = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
    };

    // Handle changes in input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate password and terms acceptance
        if (!formData.firstName || !formData.password) {
            setOpenError(true)
            return;
        }

        postUser(); // Function to handle user registration
    };

    // Function to post user data
    const postUser = async () => {
        try {

            const response: number = await AuthService.login({ username: formData.firstName, password: formData.password });
            const user: User = await UserService.getUserById(response)
            dispatch({
                type: 'UPDATE_CURRENT_USER',
                payload: user
            })
            const userCards : CardProps[] = await CardService.getUserCards(user.id);
            dispatch({
                type: 'UPDATE_USER_CARDS',
                payload: userCards
            })
            const buyCards : CardProps[] = await CardService.getAllCards();
            dispatch({
                type: 'UPDATE_BUY_CARDS',
                payload: buyCards
            })

            navigate("/")
        }
        catch (err) {
            alert("Error, wrong first name or password")
            setFormData({
                firstName: formData.firstName,
                password: '',
            })
        }

    };

    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: 400,
                    margin: '50px auto',
                    padding: 4,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        padding: '10px 0',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#45a049',
                        },
                    }}
                >
                    Submit
                </Button>
            </Box>
            <Link component="button" onClick={() => navigate("/register")}>create a new user</Link>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    All fields are required
                </Alert>
            </Snackbar>
        </>
    );
};

export default Login;