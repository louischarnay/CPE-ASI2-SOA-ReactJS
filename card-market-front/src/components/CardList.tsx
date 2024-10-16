import React, { useEffect, useState } from 'react';
import CardProps from '../models/CardProps';
import Card from './Card';

interface CardPropsTable {
    cards: Array<CardProps>;
}

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
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }


    return(
        <div>
        <table>
        <thead>
            <tr>
                <td>Card Name</td>
                <td>Description</td>
                <td>Family</td>
                <td>HP</td>
                <td>Energy</td>
                <td>Defense</td>
                <td>Attack</td>
                <td>Price</td>
            </tr>
        </thead>
        <tbody>
            {cards?.map((card: CardProps) => (
                <Card key={card.name} {...card} />
            ))}
        </tbody>
        </table>
        </div>
    )
}

export default CardList;