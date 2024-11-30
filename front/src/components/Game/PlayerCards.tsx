import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Pour accéder au store Redux
import "./PlayerCards.css";
import { GameCard } from '../../models/game.model';
import CardProps from '../../models/CardProps';

interface PlayerCardsProps {
    cards: (GameCard | CardProps)[];
    targetCard?: 'firstSelectedCard' | 'secondSelectedCard'; // Optionnel, car inutilisé si `isSelectable` est false
    isSelectable: boolean; // Contrôle si les cartes sont sélectionnables
}

const PlayerCards: React.FC<PlayerCardsProps> = ({ cards, targetCard, isSelectable }) => {
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const dispatch = useDispatch();

    // Sélecteur pour détecter une réinitialisation des cartes sélectionnées
    const { firstSelectedCard, secondSelectedCard } = useSelector((state: any) => state.gameReducer);

    const handleCardClick = (card: GameCard | CardProps, index: number) => {
        if (!isSelectable) return;

        setSelectedCardIndex(index);

        // Dispatcher l'action selon le targetCard
        if (targetCard) {
            if (targetCard === 'firstSelectedCard') {
                dispatch({ type: 'UPDATE_FIRST_CARD', payload: card });
            } else if (targetCard === 'secondSelectedCard') {
                dispatch({ type: 'UPDATE_SECOND_GAME', payload: card });
            }
        }
    };

    // Réinitialise la sélection visuelle lorsque les cartes sélectionnées sont réinitialisées
    useEffect(() => {
        if (
            Object.keys(firstSelectedCard).length === 0 &&
            Object.keys(secondSelectedCard).length === 0
        ) {
            setSelectedCardIndex(null); // Réinitialise la sélection visuelle
        }
    }, [firstSelectedCard, secondSelectedCard]);

    return (
        <div className="card-view">
            {cards.map((card, index) => (
                <Card
                    className={`card-container ${isSelectable && selectedCardIndex === index ? 'selected' : ''}`}
                    key={index}
                    onClick={() => handleCardClick(card, index)}
                >
                    {/* Image de la carte */}
                    <CardMedia
                        component="img"
                        height="200"
                        image={card.imgUrl}
                        alt={card.name}
                    />

                    {/* Contenu de la carte */}
                    <CardContent style={{ maxHeight: '35vh', overflowY: 'scroll' }}>
                        <Typography className="card-name" gutterBottom variant="h5" component="div">
                            {card.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {("currentHp" in card) ? (
                                <>
                                    <strong>HP :</strong> {card.currentHp} / {card.hp}
                                </>
                            ) : (
                                <>
                                    <strong>HP :</strong> {card.hp}
                                </>
                            )}
                        </Typography>

                        {"currentHp" in card && (
                            <>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Énergie :</strong> {card.energy}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Défense :</strong> {card.defence}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Attaque :</strong> {card.attack}
                                </Typography>
                            </>
                        )}
                    </CardContent>

                </Card>
            ))}
        </div>
    );
};

export default PlayerCards;
