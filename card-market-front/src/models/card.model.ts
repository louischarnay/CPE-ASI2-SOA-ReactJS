type Card = {
    name: string;
    description: string;
    family: string;
    affinity: string;
    imgUrl: string;
    id: number;
    hp: number;
    energy: number;
    defence: number;
    attack: number;
    price: number;
    userId?: number;
}

export default Card