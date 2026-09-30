import { Button, Modal, Spinner } from "react-bootstrap";

function ConfirmDeleteModal({show, noteTitle, onCancel, onConfirm, deleting}){
    return(
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Note?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete <strong>{noteTitle}</strong>? This can not be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                    onClick={onCancel}
                    disabled={deleting}>
                        Cancel
                </Button>
                <Button variant="danger" 
                    onClick={onConfirm}
                    disabled={deleting}>
                    {deleting? <Spinner size="sm" animation="border"/>:"Delete"}    
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ConfirmDeleteModal;