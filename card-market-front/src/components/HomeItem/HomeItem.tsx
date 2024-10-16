import { IconProps } from "@mui/material";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type HomeItemProps = {
    icon: ReactElement<IconProps>;
    description: string;
    redirection: string;
}

const HomeItem = ({ icon, description, redirection }: HomeItemProps) => {
    const navigate = useNavigate();
    
    return (
        <div onClick={() => navigate(redirection)}>
            {icon}
            {description}
        </div>
    )
}

export default HomeItem;