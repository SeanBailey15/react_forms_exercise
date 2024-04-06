import React from "react";
import { useFormik } from "formik";
import './NewBoxForm.css'

const CSS_COLORS = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];

const validate = values => {
    const errors = {};
    if(!values.width){
        errors.width = 'Required';
    } else if(values.width > 500){
        errors.width = 'Value Must Be 500 Or Less'
    } else if(!Number(values.width)){
        errors.width = 'Width Must Be A Positive Number'
    }

    if(!values.height){
        errors.height = 'Required'
    } else if(Number(values.height) > 500){
        errors.height = 'Value Must Be 500 Or Less'
    } else if(!Number(values.height)){
        errors.height = 'Height Must Be A Positive Number'
    }

    if(!values.color){
        errors.color = 'Required'
    } else if(!CSS_COLORS.includes(values.color)){
        errors.color = 'Invalid Color Name'
    }
    return errors;
}

const NewBoxForm = ({addBox}) => {
    const formik = useFormik({
        initialValues: {
            width : '',
            height : '',
            color : ''
        },
        validate,
        onSubmit: values => {
            addBox({...values})
            formik.resetForm()
        }
    })

    return (
        <div className="NewBoxForm">
            <form className="NewBoxForm-form" onSubmit={formik.handleSubmit}>
                <label className="NewBoxForm-label" htmlFor="width" >Box Width</label>
                <input
                    className="NewBoxForm-input" 
                    id="width"
                    name="width"
                    type="text"
                    placeholder="Pixels"
                    value={formik.values.width}
                    onChange={formik.handleChange}
                />
                {formik.errors.width ? <div className="NewBoxForm-err" >{formik.errors.width}</div> : null}
                <label className="NewBoxForm-label" htmlFor="height" >Box Height</label>
                <input
                    className="NewBoxForm-input" 
                    id="height"
                    name="height"
                    type="text"
                    placeholder="Pixels"
                    value={formik.values.height}
                    onChange={formik.handleChange}
                />
                {formik.errors.height ? <div className="NewBoxForm-err" >{formik.errors.height}</div> : null}
                <label className="NewBoxForm-label" htmlFor="color" >Box Color</label>
                <input
                    className="NewBoxForm-input" 
                    id="color"
                    name="color"
                    type="text"
                    placeholder="Color Name"
                    value={formik.values.color}
                    onChange={formik.handleChange}
                />
                {formik.errors.color ? <div className="NewBoxForm-err" >{formik.errors.color}</div> : null}
                <button className="NewBoxForm-btn" type="submit" onClick={formik.handleSubmit}>Add Box</button>
            </form>
        </div>
    )
}

export default NewBoxForm