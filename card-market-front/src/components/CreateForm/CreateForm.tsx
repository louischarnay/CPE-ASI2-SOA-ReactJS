import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CardService } from "../../services/card.service";
import useSse from "../../hooks/useSse";
import config from "../../config/config.json"

const CreateForm = () => {
    const [formData, setFormData] = useState({
        imagePrompt: '',
        descriptionPrompt: '',
        acceptedTerms: false,
    });

    const generateCard = async () => {
        await CardService.generateCard(formData.imagePrompt, formData.descriptionPrompt);
    }

    useSse(`${config.url}/sse-endpoint`, (data) => {
        console.log(data); 
    }, (error) => {
        console.error("SSE Error: ", error);
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate password and terms acceptance
        if (!formData.imagePrompt || !formData.descriptionPrompt) {
            alert('All fields are required');
            return;
        }

        if (!formData.acceptedTerms) {
            alert('You must accept the terms and conditions');
            return;
        }

        generateCard()
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 'lg',
                margin: '50px auto',
                padding: 4,
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
            <Typography variant="h5" gutterBottom>
                Generate a card
            </Typography>
            <TextField
                label="Image Prompt"
                variant="outlined"
                fullWidth
                name="imagePrompt"
                value={formData.imagePrompt}
                onChange={handleChange}
            />
            <TextField
                label="Description Prompt"
                variant="outlined"
                fullWidth
                name="descriptionPrompt"
                value={formData.descriptionPrompt}
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
                Generate
            </Button>
        </Box>)
}

export default CreateForm;