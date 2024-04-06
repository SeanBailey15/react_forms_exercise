import React, {useState} from "react";

const NewBoxForm = ({addBox}) => {
    const INITIAL_STATE = {
        width : '',
        height : '',
        color : ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addBox({...formData})
        setFormData(INITIAL_STATE)
    }

    return (
        <div className="NewBoxForm">
            <form className="NewBoxForm-form" onSubmit={handleSubmit}>
                <label className="NewBoxForm-label" htmlFor="width" >Box Width</label>
                <input
                    className="NewBoxForm-input" 
                    id="width"
                    name="width"
                    type="text"
                    placeholder="Pixels"
                    value={formData.width}
                    onChange={handleChange}
                />
                <label className="NewBoxForm-label" htmlFor="height" >Box Height</label>
                <input
                    className="NewBoxForm-input" 
                    id="height"
                    name="height"
                    type="text"
                    placeholder="Pixels"
                    value={formData.height}
                    onChange={handleChange}
                />
                <label className="NewBoxForm-label" htmlFor="color" >Box Color</label>
                <input
                    className="NewBoxForm-input" 
                    id="color"
                    name="color"
                    type="text"
                    placeholder="Color Name"
                    value={formData.color}
                    onChange={handleChange}
                />
                <button className="NewBoxForm-btn" onClick={handleSubmit}>Add Box</button>
            </form>
        </div>
    )
}

export default NewBoxForm