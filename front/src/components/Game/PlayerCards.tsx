import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import CardProps from '../../models/CardProps';

import "./PlayerCards.css";

interface PlayerCardsProps {
    cards: CardProps[];
}

const PlayerCards: React.FC<PlayerCardsProps> = ({cards}) => {



    return (
        <div className='card-view'>
        {cards.map((card) => (
            <Card className='card-container'>
            {/* Image de la carte */}
            <CardMedia
                component="img"
                height="200"
                image={card.imgUrl}
                alt={card.name}
                />

            {/* Contenu de la carte */}
            <CardContent style={{maxHeight: '35vh', overflowY : 'scroll'}}>
                <Typography className='card-name' gutterBottom variant="h5" component="div" >
                    {card.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>HP : </strong>{card.hp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Énergie : </strong>{card.energy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Défense : </strong>{card.defence}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Attaque : </strong>{card.attack}
                </Typography>
            </CardContent>
            </Card>
        ))}
        </div>
    );
}

export default PlayerCards;