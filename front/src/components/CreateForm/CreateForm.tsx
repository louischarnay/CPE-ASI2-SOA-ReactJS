import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CardService } from "../../services/card.service";
import config from "../../config/config.json"
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from "react-redux";
import User from "../../models/user.model";
import Card from "../../models/card.model";

const CreateForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        imagePrompt: '',
        descriptionPrompt: '',
        acceptedTerms: false,
    });

    const [loading, setLoading] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const dispatch = useDispatch();
    const currentUser: User = useSelector((state: any) => state.userReducer.currentUser)

    const handleCloseError = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setLoading(false);
        setOpenError(false);
    };

    const updateGeneratedCard = (cardProps: any) => {
        console.log(cardProps)

        const card : Card = cardProps;

        dispatch({
            type: 'UPDATE_GENERATED_CARD',
            payload: card
        })
        updateData(currentUser.id)
    }

    const updateData = async (userId: number) => {
        const userCards = await CardService.getUserCards(userId)
        dispatch({
            type: 'UPDATE_USER_CARDS',
            payload: userCards
        })

        const cards = await CardService.getAllCards()
        dispatch({
            type: 'UPDATE_BUY_CARDS',
            payload: cards
        })
    }

    const handleCloseSuccess = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setLoading(false);
        setOpenSuccess(false);
    };

    const generateCard = async () => {
        const id = await CardService.generateCard(formData.imagePrompt, formData.descriptionPrompt, formData.name, currentUser.id);
        startSse(id);

    }

    const startSse = (id: number) => {
        const evtSource = new EventSource(config.generateUrl + "/sse?id=" + id);

        evtSource.onmessage = (event) => {
            setOpenSuccess(true)
            setLoading(false);
            updateGeneratedCard(JSON.parse(event.data))
            evtSource.close();
        };

        evtSource.onerror = (error) => {
            console.error("SSE error:", error); // Log de l'erreur dans la console pour debugging
            setOpenError(true); // Affiche la snackbar en cas d'erreur
            setLoading(false);
            evtSource.close(); // Ferme la connexion SSE pour éviter les erreurs continues
        };
    };

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

        setLoading(true);
        generateCard()
    };

    return (
        <>
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
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
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
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
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
                </LoadingButton>
            </Box>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert
                    onClose={handleCloseError}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    An error occured during card generation
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert
                    onClose={handleCloseSuccess}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Card successfully generated
                </Alert>
            </Snackbar>
        </>)
}

export default CreateForm;