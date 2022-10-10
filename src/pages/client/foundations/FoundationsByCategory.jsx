import React from 'react'
import { useState, useEffect } from 'react';
import ListFoundations from '../../../components/elements/ListFoundations';
import { getAcceptedFoundations, getFoundationsByCategory } from '../../../services/foundation'
import { getAllCategories } from '../../../services/categories/categoryDB'

const FoundationsByCategory = () => {
        const [foundations, setFoundations] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        Promise.all([getAcceptedFoundations(),getAllCategories()]).then(([foundations,categories])=>{
            setFoundations(foundations)
            setCategories(categories)
        })
    }
    const handleChange = async(e) => {
        const res = await getFoundationsByCategory(e.target.value)
        setFoundations(res);
   
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