import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import User from "../../models/user.model";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        password: '',
    });

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
            alert('All fields are required');
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
        </>
    );
};

export default Login;