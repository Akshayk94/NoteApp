import {Badge, Button, ButtonGroup, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import {formatDate} from "../utils/constants";
function NoteCard({note, onDelete, onTogglePin, pinning}){
    const preview=note.content.length>100?
    `${note.content.slice(0,100)}...`:note.content;
    return(
        <Card className={`h-100 shadow-sm-border-0 border-top border-4 border-${note.color}`}> 
            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-0 fs-6 fw-bold">
                        <Link to={`/notes/${note._id}`} className="text-decoration-none text-dark">
                            {note.title}
                        </Link>
                    </Card.Title>
                    <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-decoration-none"
                        title={note.isPinned?"Unpin":"Pin"}
                        disabled={pinning}
                        onClick={()=>onTogglePin(note)}
                    >
                        {note.isPinned?"📌":"📍"}
                    </Button>
                </div>
                <div className="mb-2">
                    <Badge bg={note.color==="light"?"secondary":note.color}>
                        {note.category}
                    </Badge>
                </div>
                <Card.Text className="text-muted small flex-grow-1">
                    {preview}
                </Card.Text>
                <small className="text-muted mb-3">
                    Updated:{formatDate(note.updatedAt)}
                </small>
                <div className="d-flex gap-2">
                    <Button as={Link} to={`/notes/${note._id}`} 
                    variant="outline-primary" size="sm" className="flex-fill">
                        View
                    </Button>
                    <Button as={Link} to={`/notes/edit/${note._id}`} 
                    variant="outline-warning" size="sm" className="flex-fill">
                        Edit
                    </Button>
                    <Button  variant="outline-danger" size="sm" className="flex-fill"
                        onClick={()=>onDelete(note)}>
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
export default NoteCard;