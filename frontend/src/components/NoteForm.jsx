import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { CATEGORIES, COLORS } from "../utils/constants";

const EMPTY_NOTE={title:"",content:"",category:"General",color:"light"}
function NoteForm({initialValues=EMPTY_NOTE, onSubmit, onCancel, submitText, submitting, serverError}){
    const [formData, setFormData]=useState({...EMPTY_NOTE,...initialValues});
    const [errors, setErrors]=useState({});

    const handleChange=(e)=>{
        const{name, value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}));
        setErrors((prev)=>({...prev,[name]:""}));
    }

    const validate=()=>{
        const newErrors={};
        if(formData.title.trim().length<3)
            newErrors.title="Title must be at least 3 characters";

        if(!formData.content.trim())
            newErrors.content="Content is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!validate()) return;
        onSubmit({
            title: formData.title.trim(),
            content: formData.content.trim(),
            category: formData.category,
            color: formData.color
        });
    };

    return(
        <Form onSubmit={handleSubmit} noValidate>
            {serverError && <Alert variant="danger">{serverError}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Note Title"
                    maxLength={100}
                    isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
                <Form.Text muted>
                    {formData.title.length}/100
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Content</Form.Label>
                <Form.Control
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your note ..."
                    isInvalid={!!errors.content}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.content}
                </Form.Control.Feedback>
            </Form.Group>
            <div className="row g-3 mb-4">
                <Form.Group className="col-md-6">
                    <Form.Label className="fw-bold">Category</Form.Label>
                    <Form.Select name="category" value={formData.category}
                    onChange={handleChange}>
                        {CATEGORIES.map((c)=>(<option key={c} value={c}>{c}</option>))}
                    </Form.Select>
                </Form.Group>
            </div>
            <div className="row g-3 mb-4">
                <Form.Group className="col-md-6">
                    <Form.Label className="fw-bold">Color</Form.Label>
                    <Form.Select name="color" value={formData.color}
                    onChange={handleChange}>
                        {COLORS.map((c)=>(<option key={c.value} value={c.value}>{c.label}</option>))}
                    </Form.Select>
                </Form.Group>
            </div>
            <div className="d-flex gap-2">
                <Button type="submit" disabled={submitting}>
                    {submitting?<><Spinner size="sm" animation="border"/>Saving...</>:submitText}
                </Button>
                <Button variant="outline-secondary" onClick={onCancel} disabled={submitting}>
                    Cancel
                </Button>
            </div>
        </Form>
    )
}
export default NoteForm;