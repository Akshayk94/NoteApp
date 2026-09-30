import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/noteService";
import { Card, Col, Container, Row } from "react-bootstrap";
import NoteForm from "../components/NoteForm";

function CreateNotePage(){
    const navigate=useNavigate();
    const [submitting, setSubmitting]=useState(false);
    const [serverError, setServerError]=useState("");
    const handleCreate=async (noteData)=>{
        setSubmitting(true);
        setServerError("");
        try {
            await createNote(noteData);
            navigate("/",{state:{message:"Note Created Successfully"}});
        } catch (error) {
            setServerError(error.message);
            setSubmitting(false);
        }
    };
    return(
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">✍️Create new  note</h5>
                        </Card.Header>
                        <Card.Body>
                            <NoteForm
                                submitText="Create Note"
                                submitting={submitting}
                                serverError={serverError}
                                onSubmit={handleCreate}
                                onCancel={()=>navigate("/")}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default CreateNotePage;