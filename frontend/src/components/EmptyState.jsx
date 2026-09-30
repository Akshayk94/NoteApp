import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function EmptyState({hasFilters=false}){
    return(
        <Alert variant="info" className="text-center py-4">
            {hasFilters?(
                <>
                    <h4>No matching notes</h4>
                    <p className="mb-0">Try a different search ot category.</p>
                </>
            ):(
                <>
                    <h5>No notes yet</h5>
                    <p>Create your first note to get started</p>
                    <Button as={Link} to="/notes/new">Create Note</Button>
                </>
            )}
        </Alert>
    )
}
export default EmptyState;