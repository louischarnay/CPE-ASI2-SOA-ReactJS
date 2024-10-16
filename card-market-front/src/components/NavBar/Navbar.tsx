import PageTitle from "./PageTitle/PageTitle";
import UserComponent from "./UserComponent/UserComponent";
import './Navbar.css'

const NavBar = () => {
    return (
        <div className="navbar-container">
            <PageTitle description={"Add an user"}/>
            <UserComponent />
        </div>
    )
}

export default NavBar;