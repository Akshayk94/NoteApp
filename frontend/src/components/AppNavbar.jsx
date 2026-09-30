import {Button, Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink} from "react-router-dom";
function AppNavbar(){
    return(
        <Navbar bg="secondary" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    📝 NOTES APP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav"/>
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto align-items-md-center gap-2">
                        <Nav.Link as={NavLink} to="/" end>
                            ALL NOTES
                        </Nav.Link>
                        <Button as={Link} to="/notes/new" variant="primary">
                            + ADD NOTE
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default AppNavbar;