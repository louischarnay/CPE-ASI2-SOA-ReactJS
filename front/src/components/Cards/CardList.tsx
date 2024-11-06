import React, { useEffect, useState } from 'react';
import CardProps from '../../models/CardProps';
import Card from './Card';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, CircularProgress, Snackbar, Box } from '@mui/material';

interface CardListProps {
    cards: CardProps[];
    setSelectedCard: (card: CardProps) => void;
    listTitle : string;
}

const CardList: React.FC<CardListProps> = ({cards, setSelectedCard, listTitle}) => {
    const [error] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (cards && cards.length > 0) {
            setLoading(false);
        } else {
            setLoading(false);
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
        <TableContainer component={Paper} style={{ borderRadius: '10px' }}>
        <Typography variant="h4" align="center" style={{ marginBottom: '20px' }}>
            {listTitle}
        </Typography>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </Box>
        ) : cards.length === 0 ? (
            <Typography variant="h6" align="center" style={{ padding: '20px' }}>
                No cards available
            </Typography>
        ) : (
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
        
    );
};

export default CardList;

