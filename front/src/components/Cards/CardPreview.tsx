import CardProps from '../../models/CardProps';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import './CardPreview.css'

const CardPreview = ({name, description, family, affinity, imgUrl, smallImgUrl, id, hp, energy, defence, attack, price, userId, handleCLick, isClickable} : CardProps) => {
    return (
        <>
        <Card style={{ maxWidth: 345, margin: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            {/* Image de la carte */}
            <CardMedia
                component="img"
                height="200"
                image={imgUrl}
                alt={name}
                />

            {/* Contenu de la carte */}
            <CardContent style={{maxHeight: '35vh', overflowY : 'scroll'}}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Famille : </strong> {family}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>HP : </strong>{hp}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Énergie : </strong>{energy}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Défense : </strong>{defence}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Attaque : </strong>{attack}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Prix : </strong>{price}€
                </Typography>
            </CardContent>

            {/* Bouton au centre en bas */}
            {
                isClickable && 
                <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => handleCLick(id)}> 
                   <PaymentsIcon className='pr'/> {price}€
                </Button>
            </CardActions>
            }
        </Card>
        </>
    );
};

export default CardPreview;
