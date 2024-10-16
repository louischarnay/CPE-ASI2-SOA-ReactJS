import React, { FC } from 'react';
import CardProps from '../../models/CardProps';
import { TableRow, TableCell } from '@mui/material';

interface CardComponentProps extends CardProps {
    onClick: () => void;
}

const Card: FC<CardComponentProps> = (props) => {
    return (
        <TableRow hover onClick={props.onClick} style={{ cursor: 'pointer' }}>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.description}</TableCell>
            <TableCell>{props.family}</TableCell>
            <TableCell>{props.hp}</TableCell>
            <TableCell>{props.energy}</TableCell>
            <TableCell>{props.defense}</TableCell>
            <TableCell>{props.attack}</TableCell>
            <TableCell>{props.price}</TableCell>
        </TableRow>
    );
};

export default Card;
