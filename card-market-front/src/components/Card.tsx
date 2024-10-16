import React, { FC } from 'react';
import CardProps from '../models/CardProps';

const Card: FC<CardProps> = ({ name, description, family, hp, energy, defense, attack, price }) => {
    return(
        <tr>
            <td>{name}</td>
            <td>{description}</td>
            <td>{family}</td>
            <td>{hp}</td>
            <td>{energy}</td>
            <td>{defense}</td>
            <td>{attack}</td>
            <td>{price}</td>
        </tr>
    )
}

export default Card;