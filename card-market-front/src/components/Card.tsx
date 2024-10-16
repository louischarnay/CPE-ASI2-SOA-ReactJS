import React, { FC } from 'react';
import CardProps from '../models/CardProps';
import { TableRow, TableCell } from '@mui/material';

interface CardComponentProps extends CardProps {
    onClick: () => void;
}

const Card: FC<CardComponentProps> = ({ name, description, family, hp, energy, defense, attack, price, onClick }) => {
    return (
        <TableRow hover onClick={onClick} style={{ cursor: 'pointer' }}>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{family}</TableCell>
            <TableCell>{hp}</TableCell>
            <TableCell>{energy}</TableCell>
            <TableCell>{defense}</TableCell>
            <TableCell>{attack}</TableCell>
            <TableCell>{price}</TableCell>
        </TableRow>
    );
};

export default Card;
