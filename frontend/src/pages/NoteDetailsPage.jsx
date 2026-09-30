import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNoteById, togglePin, deleteNote } from "../services/noteService";
import { Alert, Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { formatDate } from "../utils/constants";
import LoadingState from "../components/LoadingState";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";


function NoteDetailsPage(){
    const {id}=useParams();
    const navigate=useNavigate();
    const [note, setNote]=useState(null);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState("");
    const [showDelete, setShowDelete]=useState(false);
    const [deleting, setDeleting]=useState(false);
    const [pinning, setPinning]=useState(false);

    useEffect(()=>{
        let ignore=false;
        getNoteById(id)
            .then((data)=> !ignore && setNote(data))
            .catch((err)=> !ignore && setError(err.message))
            .finally(()=> !ignore && setLoading(false));
        return ()=>{ ignore = true; };
    },[id]);

    const handleTogglePin= async() =>{
        setPinning(true);
        try {
            setNote(await togglePin(note));
        } catch (error) {
            setError(error.message);
        } finally{
            setPinning(false);
        }
    };

    const handleDelete=async()=>{
        setDeleting(true);
        try {
            await deleteNote(id);
            navigate("/",{state:{message:"Note Deleted Successfully"}});
        } catch (error) {
            setError(error.message);
            setDeleting(false);
            setShowDelete(false);
        }
    };

    if(loading) return <LoadingState text="Loading note..."/>;
    if(!note){
        return(
            <Container className="py-4">
                <Alert variant="danger">{error || "Note not found"}</Alert>
                <Button as={Link} to="/">Back to Notes</Button>
            </Container>
        );
    }

    return(
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    {error && <Alert variant="danger" dismissible onClose={()=>setError("")}>{error}
                        </Alert>}
                    <Card className={`shadow-sm border-0 border-top border-5 border-${note.color}`}>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <h3 className="mb-0">{note.title}</h3>
                            </div>
                            <Badge bg="secondary" className="mb-3">{note.category}</Badge>
                            <p className="text-muted small mb-1">Created: {formatDate(note.createdAt, true)}</p>
                            {note.updatedAt !== note.createdAt && (
                                <p className="text-muted small">Updated: {formatDate(note.updatedAt, true)}</p>
                            )}

                            <p className="mt-4" style={{whiteSpace:"pre-wrap"}}>{note.content}</p>
                        </Card.Body>
                        <hr/>
                        <div className="d-flex flex-wrap gap-2">
                            <Button variant="outline-dark" onClick={handleTogglePin} disabled={pinning}>
                                {note.isPinned?"Unpin":"Pin"}
                            </Button>
                            <Button as={Link} to={`/notes/edit/${note._id}`} variant="warning">
                                EDIT
                            </Button>
                            <Button onClick={()=>setShowDelete(true)} variant="danger">
                                DELETE
                            </Button>
                            <Button as={Link} to="/" variant="secondary" className="ms-auto">
                                BACK
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
            <ConfirmDeleteModal
                show={showDelete}
                noteTitle={note.title}
                deleting={deleting}
                onCancel={()=>setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </Container>
    );
}

export default NoteDetailsPage;