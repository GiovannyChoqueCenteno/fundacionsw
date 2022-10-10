import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListFoundations from '../../../components/elements/ListFoundations';
import { getAcceptedFoundations, getFoundationsByCategory, getFoundationsByDepartment } from '../../../services/foundation'
import { fundaciones } from '../../../utils/mocks/fundacion'
import { getAllDeparments } from '../../../services/deparments/deparmentDB'

const FoundationsByCategory = () => {
        const [foundations, setFoundations] = useState([])
    const [departments, setDepartments] = useState([])
    const navigate = useNavigate();



    useEffect(() => {
       getData()
    }, [])

    const getData =  () => {
        Promise.all([getAcceptedFoundations(),getAllDeparments()]).then(([foundations,deparments])=>{
            setDepartments(deparments)
            setFoundations(foundations);    
        })
    }
    const handleChange = async(e) => {
        console.log(e.target.value)
        const res = await getFoundationsByDepartment(e.target.value)
        setFoundations(res);
   
    }
    return (
        <>
            <div>
                <select className='' name="" id="" onChange={handleChange} >
                    <option value="">Seleccionar Departamento</option>
                    {departments.map(department =>(
                        <option key={department.id} value={department.id}>{department.nombre}</option>
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