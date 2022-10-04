import { useState } from "react";


const useForm = (initialState = {}) => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e) => {
        setForm(form => (
            {
                ...form,
                [e.target.name]: e.target.value

            }
        ))
    }

    const clear = () => {
        setForm(initialState);
    }

    return {
        form,
        handleChange,
        clear
    }
}

export default useForm;