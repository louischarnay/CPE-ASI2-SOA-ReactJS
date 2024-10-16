import React, { FC } from 'react';
import CardProps from '../../models/CardProps';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';

const CardPreview: FC<CardProps> = (props) => {
    return (
        <Card style={{ maxWidth: 345, margin: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            {/* Image de la carte */}
            <CardMedia
                component="img"
                height="200"
                image={props.imgUrl}
                alt={props.name}
            />

            {/* Contenu de la carte */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Famille : </strong> {props.family}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>HP : </strong>{props.hp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Énergie : </strong>{props.energy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Défense : </strong>{props.defense}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Attaque : </strong>{props.attack}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Prix : </strong>{props.price}€
                </Typography>
            </CardContent>

            {/* Bouton au centre en bas */}
            <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" color="primary">
                    Voir Détails
                </Button>
            </CardActions>
        </Card>
    );
};

export default CardPreview;
