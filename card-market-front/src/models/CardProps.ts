type CardProps = {
    name: string;
    description: string;
    family: string;
    affinity: string;
    imgUrl: string;
    smallImgUrl: string;
    id: number;
    hp: number;
    energy: number;
    defense: number;
    attack: number;
    price: number;
    userId?: number;
    isClickable: boolean;
    handleCLick: (e : any) => void;
}

export default CardProps;