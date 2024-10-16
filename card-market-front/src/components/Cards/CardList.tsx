import React, { useEffect, useState } from 'react';
import CardProps from '../../models/CardProps';
import Card from './Card';
import CardPreview from './CardPreview';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, CircularProgress, Snackbar, Grid, Box } from '@mui/material';

const CardList: React.FC = () => {
    const url = 'http://tp.cpe.fr:8083/cards';

    const [cards, setCards] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null); // État pour stocker la carte sélectionnée

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

    // Fonction qui gère la sélection d'une carte dans le tableau
    const handleCardClick = (card: CardProps) => {
        setSelectedCard(card);
    };

    return (
        <Grid container spacing={3} style={{ padding: '20px' }}>
            {/* Tableau des cartes (gauche) */}
            <Grid item xs={12} md={9} style={{ width: '70%' }}>
                <TableContainer component={Paper} style={{ borderRadius: '10px' }}>
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
            </Grid>

            {/* Preview de la carte (droite) fixée et centrée */}
            <Grid item xs={12} md={3} style={{ width: '30%', position: 'relative' }}>
                {selectedCard ? (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            right: '5%', // Ajustement pour l'espacement
                            transform: 'translateY(-50%)',
                            width: 'calc(20% - 40px)', // 30% de la largeur moins les marges
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardPreview {...selectedCard} />
                    </Box>
                ) : (
                    <Typography variant="h6" align="center">
                        Cliquez sur une carte pour voir les détails
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default CardList;
