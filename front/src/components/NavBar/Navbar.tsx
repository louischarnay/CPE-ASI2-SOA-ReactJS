import PageTitle from "./PageTitle/PageTitle";
import UserComponent from "./UserComponent/UserComponent";
import './Navbar.css'
import { useSelector } from "react-redux";

const NavBar = () => {
    const currentUser = useSelector((state: any) => state.userReducer.currentUser)

    return (
        <div className="navbar-container">
            <PageTitle currentUser={currentUser}/>
            <UserComponent currentUser={currentUser} />
        </div>
    )
}

export default NavBar;