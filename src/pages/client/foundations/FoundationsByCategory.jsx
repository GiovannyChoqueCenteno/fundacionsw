import { async } from '@firebase/util';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListFoundations from '../../../components/elements/ListFoundations';
import { getAcceptedFoundations, getFoundationsByCategory } from '../../../services/foundation'
import { fundaciones } from '../../../utils/mocks/fundacion'
import { getAllCategories } from '../../../services/categories/categoryDB'

const FoundationsByCategory = () => {
        const [foundations, setFoundations] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();



    useEffect(() => {
        getFoundations();
        getCategories();
    }, [])

    const getFoundations = async () => {
        const res = await getAcceptedFoundations()
        setFoundations(res);
    }
    const handleChange = async(e) => {
        console.log(e.target.value)
        const res = await getFoundationsByCategory(e.target.value)
        setFoundations(res);
   
    }
    const getCategories = async () => {
        const res = await getAllCategories();
        console.log(res)
        setCategories(res)
    }
    return (
        <>
            <div>
                <select className='' name="" id="" onChange={handleChange} >
                    <option value="">Seleccionar Categoria</option>
                    {categories.map(category =>(
                        <option key={category.id} value={category.id}>{category.nombre}</option>
                    ))}
                </select>
            </div>

            <div className='grow flex justify-center items-center'>
                <div className='container mx-auto grid gap-4  grid-cols-1 mt-3 lg:grid-cols-3'>
                    <ListFoundations foundations={foundations} />
                </div>
            </div>
        </>

    )
}


export default FoundationsByCategory