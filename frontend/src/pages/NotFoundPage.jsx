import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage(){
    return(
        <Container className="py-5 text-center">
            <h2>404 - Page Not Found</h2>
            <Button as={Link} to="/" className="mt-3">
                Go to Notes
            </Button>
        </Container>
    )
}
export default NotFoundPage;