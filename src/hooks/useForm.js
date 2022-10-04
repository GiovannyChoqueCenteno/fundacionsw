import { useState } from "react";


const useForm = (initialState = {}) => {
    const [form, setForm] = useState(initialState);

<<<<<<< HEAD
    const handleChange = (e)=>{
        
        setForm(form => (
            {
                ...form,
                [e.target.name] :  e.target.value
=======
    const handleChange = (e) => {
        setForm(form => (
            {
                ...form,
                [e.target.name]: e.target.value
>>>>>>> ef01f10bddab73bd517ea48fedb0b7828233e226
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