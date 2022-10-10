import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  {getAcceptedFoundations} from '../../../services/foundation'
const FoundationsByDepartament = () => {
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
        <div className='ml-4'>
        <select className='' name="" id="" >
        <option value="">Seleccionar departamento</option>
        <option value="">Categoria 1</option>
        <option value="">Categoria 2</option>
        </select>
        </div>

        <div className='grow flex justify-center items-center'>

        <div className='container mx-auto grid gap-4  grid-cols-1 mt-3 lg:grid-cols-3'>
        {foundations.map( fundacion =>(
            <div key={fundacion.id} onClick={()=>handleClick(fundacion.id)} className="card w-full bg-base-100 shadow-xl hover:cursor-pointer hover:translate-y-1 hover:bg-slate-400">
                <figure><img src={fundacion.urlImagen} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{fundacion.nombre}</h2>
                    <p>{fundacion.descripcion}</p>
                   
                </div>
            </div>
        )
        )}
        </div>
        </div>
        </>

    )
}


export default FoundationsByDepartament