import React from "react";
import { useFormik } from "formik";
import './NewTodoForm.css'

const validate = values => {
    const errors = {};
    if(!values.content){
        errors.content = 'Required';
    } else if(values.content.length > 30){
        errors.content = 'Todo Must Be 30 Characters Or Less'
    }
    return errors;
}

const NewTodoForm = ({addTodo}) => {
    const formik = useFormik({
        initialValues: {
            content: ''
        },
        validate,
        onSubmit: values => {
            addTodo({...values})
            formik.resetForm()
        }
    })

    return (
        <div className="NewTodoForm">
            <form className="NewTodoForm-form" onSubmit={formik.handleSubmit}>
                <label className="NewTodoForm-label" htmlFor="content" >Todo</label>
                <input
                    className="NewTodoForm-input" 
                    id="content"
                    name="content"
                    type="text"
                    placeholder="What to do, what to do?"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                />
                {formik.errors.content && formik.touched.content && (
                    <div className="NewTodoForm-err">{formik.errors.content}</div>
                )}
                <button className="NewTodoForm-btn" type="submit" onClick={formik.handleSubmit}>Add A Task</button>
            </form>
        </div>
    )
}

export default NewTodoForm