import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { AuthService } from '../../services/auth.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        acceptedTerms: false
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
        if ( !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.rePassword ) {
            alert('All fields are required');
            return;
        }
        if (formData.password !== formData.rePassword) {
            alert('Passwords do not match');
            return;
        }
        if (!formData.acceptedTerms) {
            alert('You must accept the terms and conditions');
            return;
        }

        postUser(); // Function to handle user registration
    };

    // Function to post user data
    const postUser = async () => {
        try {
            const response = await AuthService.register({
                login: formData.firstName,
                pwd: formData.password,
                account: 0,
                lastName: formData.lastName,
                surName: formData.firstName,
                email: formData.email,
                cardList: []
            })
            dispatch({
                type: 'UPDATE_CURRENT_USER',
                payload: response
            })
            navigate("/")
        } catch (err) {
            alert(err)
        }
    };

    return (
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
                Register
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
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                name="email"
                value={formData.email}
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
            <TextField
                label="Re-Password"
                variant="outlined"
                type="password"
                fullWidth
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={handleChange}
                    />
                }
                label="I agree to the Terms and Conditions"
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
    );
};

export default UserForm;
