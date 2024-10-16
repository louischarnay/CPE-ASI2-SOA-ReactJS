import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import { Container } from "@mui/material";

export default function Root() {
  return (
    <>
      <NavBar/>
      <Container maxWidth="lg" id="detail">
        <Outlet />
      </Container>
    </>
  );
}
