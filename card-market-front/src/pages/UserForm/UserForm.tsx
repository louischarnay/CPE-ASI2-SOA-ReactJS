<<<<<<< Updated upstream
const UserForm = () => {
    return (
        <>
        <h1>Register</h1>
        </>
    )
}

export default UserForm;
=======
import { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Box } from '@mui/material';

// import './UserForm.css';

const UserForm = () => {
    const url = "http://tp.cpe.fr:8083/user";

    const [formData, setFormData] = useState({
        surName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        acceptedTerms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.rePassword) {
            alert('Passwords do not match');
            return;
        }
        if (!formData.acceptedTerms) {
            alert('You must accept the terms and conditions');
            return;
        }

        postUser();
    };

    const postUser = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: formData.email,
                    pwd: formData.password,
                    lastName: formData.lastName,
                    surName: formData.surName,
                    email: formData.email
                })
            });

            if (!response.ok) {
                // Extract and show the error message if available
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Error creating user'}`);
            } else {
                alert('User created successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please try again later.');
        }
    };

    return (
        <>
            <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 500,
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
            <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                value={formData.surName}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '4px',
                    },
                }}
            />
            <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Re-Password"
                variant="outlined"
                type="password"
                fullWidth
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
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
                sx={{
                    marginBottom: 2,
                    '& .MuiTypography-root': {
                        fontSize: '14px',
                    },
                }}
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
        </>
    );
};

export default UserForm;
>>>>>>> Stashed changes
