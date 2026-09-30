import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../services/noteService";
import LoadingState from "../components/LoadingState";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import NoteForm from "../components/NoteForm";

function EditNotePage(){
    const {id}=useParams();
    const navigate=useNavigate();

    const [note, setNote]=useState(null);
    const [loading, setLoading]=useState(true);
    const [loadError, setLoadError]=useState("");
    const [submitting, setSubmitting]=useState(false);
    const [serverError, setServerError]=useState("");

    useEffect(()=>{
        let ignore=false;
        getNoteById(id)
            .then((data)=>!ignore && setNote(data))
            .catch((err)=> !ignore && setLoadError(err.message))
            .finally(()=> !ignore && setLoading(false));
            return ()=>{ignore = true;};
    },[id]);

    const handleUpdate=async (noteData)=>{
        setSubmitting(true);
        setServerError("");
        try {
            await updateNote(id, noteData);
            navigate("/",{state:{message:"Note Updated Successfully"}});
        } catch (error) {
            setServerError(error.message);
            setSubmitting(false);
        }
    };

    if(loading) return <LoadingState text="Loading note..."/>;
    if(loadError){
        return(
            <Container className="py-4">
                <Alert variant="danger">{loadError}</Alert>
                <Button as={Link} to="/">Back to Notes</Button>
            </Container>
        );
    }

    return(
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-warning">
                            <h5 className="mb-0">✏️ EDIT NOTE</h5>
                        </Card.Header>
                        <Card.Body>
                            <NoteForm
                                initialValues={{
                                    title:note.title,
                                    content:note.content,
                                    category:note.category,
                                    color:note.color
                                }}
                                submitText="Update Note"
                                submitting={submitting}
                                serverError={serverError}
                                onSubmit={handleUpdate}
                                onCancel={()=>navigate(-1)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default EditNotePage;