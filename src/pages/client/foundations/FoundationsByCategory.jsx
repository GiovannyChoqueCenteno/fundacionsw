import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListFoundations from '../../../components/elements/ListFoundations';
import  {getAcceptedFoundations} from '../../../services/foundation'
import {fundaciones} from '../../../utils/mocks/fundacion'

const FoundationsByCategory = () => {
    const [foundations, setFoundations] = useState([])

    const navigate = useNavigate();

    const handleClick = (id_fundacion) => {
        navigate(`/fundacion/${id_fundacion}`)
    }

    useEffect(()=>{
        getFoundations();
    },[])

    const getFoundations = async()=>{
          const res=await getAcceptedFoundations()
            setFoundations(res);
     }

    return (
        <>
        <div>
        <select className='' name="" id="" >
        <option value="">Seleccionar Categoria</option>
        <option value="">Categoria 1</option>
        <option value="">Categoria 2</option>
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