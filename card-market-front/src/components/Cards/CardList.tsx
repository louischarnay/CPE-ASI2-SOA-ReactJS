import React, { useEffect, useState } from 'react';
import CardProps from '../../models/CardProps';
import Card from './Card';
import CardPreview from './CardPreview';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, CircularProgress, Snackbar, Grid, Box } from '@mui/material';

interface CardListProps {
    fetchMethod: 'all' | 'user';
    handleClick: (e: any) => void;
    cards: CardProps[];
}

const CardList: React.FC<CardListProps> = ({ fetchMethod = 'all', handleClick, cards }) => {
    const [error, setError] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null); // State for storing selected card
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate data fetching
        if (cards && cards.length > 0) {
            setLoading(false); // Stop loading once cards are available
        } else {
            setLoading(false); // Stop loading even if cards array is empty
        }
    }, [cards]);

    if (error) {
        return (
            <Snackbar
                open={true}
                message={`Erreur : ${error}`}
                autoHideDuration={6000}
            />
        );
    }

    // Function to handle card selection
    const handleCardClick = (card: CardProps) => {
        setSelectedCard(card);
    };

    return (
        <Grid container spacing={3} style={{ padding: '20px' }}>
            {/* Left side card table */}
            <Grid item xs={12} md={9} style={{ width: '70%' }}>
                <TableContainer component={Paper} style={{ borderRadius: '10px' }}>
                    <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
                        Liste des Cartes
                    </Typography>
                    {loading ? ( // Show spinner while loading
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                            <CircularProgress />
                        </Box>
                    ) : cards.length === 0 ? ( // Show "No cards available" when cards array is empty
                        <Typography variant="h6" align="center" style={{ padding: '20px' }}>
                            No cards available
                        </Typography>
                    ) : ( // Display the cards table when data is available
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
                                    <Card key={card.id} {...card} onClick={() => handleCardClick(card)} />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Grid>

            {/* Right side card preview */}
            <Grid item xs={12} md={3} style={{ width: '30%', position: 'relative' }}>
                {selectedCard ? (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            right: '5%',
                            transform: 'translateY(-50%)',
                            width: 'calc(20% - 40px)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CardPreview
                            handleCLick={handleClick}
                            affinity={selectedCard.affinity}
                            attack={selectedCard.attack}
                            defense={selectedCard.defense}
                            description={selectedCard.description}
                            energy={selectedCard.energy}
                            family={selectedCard.family}
                            hp={selectedCard.hp}
                            id={selectedCard.id}
                            imgUrl={selectedCard.imgUrl}
                            name={selectedCard.name}
                            price={selectedCard.price}
                            smallImgUrl={selectedCard.smallImgUrl}
                            userId={selectedCard.userId}
                        />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '50%',
                            right: '5%',
                            transform: 'translateY(-50%)',
                            width: 'calc(20% - 40px)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" align="center">
                            Cliquez sur une carte pour voir les détails
                        </Typography>
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};

export default CardList;
