import React, { useEffect, useState } from 'react';
import CardProps from '../../models/CardProps';
import Card from './Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, CircularProgress, Snackbar } from '@mui/material';

const CardList: React.FC = () => {
    const url = 'http://tp.cpe.fr:8083/cards';

    const [cards, setCards] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fonction qui fait la requête à l'API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Une erreur est survenue lors de la requête API');
                }
                const result: CardProps[] = await response.json();
                setCards(result);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Gestion de l'état "loading" et "error"
    if (loading) {
        return (
            <TableContainer component={Paper} style={{ padding: '20px', height: '100%' }}>
                <Typography variant="h6" align="center">
                    Chargement des cartes...
                </Typography>
                <CircularProgress style={{ display: 'block', margin: 'auto' }} />
            </TableContainer>
        );
    }

    if (error) {
        return (
            <Snackbar
                open={true}
                message={`Erreur : ${error}`}
                autoHideDuration={6000}
            />
        );
    }

    const handleCardClick = (card: CardProps) => {
        console.log("Carte cliquée:", card);
    };

    return (
        <TableContainer component={Paper} style={{ padding: '20px', height: '100%', borderRadius: '10px' }}>
            <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
                Liste des Cartes
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Card Name</strong></TableCell>
                        <TableCell><strong>Description</strong></TableCell>
                        <TableCell><strong>Family</strong></TableCell>
                        <TableCell><strong>HP</strong></TableCell>
                        <TableCell><strong>Energy</strong></TableCell>
                        <TableCell><strong>Defense</strong></TableCell>
                        <TableCell><strong>Attack</strong></TableCell>
                        <TableCell><strong>Price</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((card: CardProps) => (
                        <Card key={card.name} {...card} onClick={() => handleCardClick(card)} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CardList;
