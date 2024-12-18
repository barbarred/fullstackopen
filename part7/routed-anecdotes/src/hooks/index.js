import { useState } from "react"

export const useForm = (initialState = {}) => {
    const [formValues, setFormValues] = useState(initialState)

    const onChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const resetFields = () => {
        setFormValues(initialState)
    }

    return {
        formValues, onChange, resetFields
    }
}