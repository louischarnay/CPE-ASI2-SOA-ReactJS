import { useSelector } from "react-redux";
import { Player } from "../../models/game.model";
import User from "../../models/user.model";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Winner = () => {
    const winner: User = useSelector((state: any) => state.gameReducer.winner);
    const navigate = useNavigate();

    return (
    <>
    <h1>The Winner is {winner.surName}</h1>
    <Button onClick={() => navigate("/")}>Back to home</Button>
    
    </>
    )
}

export default Winner;