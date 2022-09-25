import React from 'react'

import { useNavigate } from 'react-router-dom'

import { fundaciones } from '../../../utils/constants'

const Fundaciones = () => {
    
    const navigate = useNavigate();

    const handleClick = (id_fundacion)=>{
        navigate(`/fundacion/${id_fundacion}`)
    }

    return (
        fundaciones.map( fundacion =>(
            <div className="card w-full bg-base-100 shadow-xl">
                <figure><img src={fundacion.urlImagen} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{fundacion.nombre}</h2>
                    <p>{fundacion.descripcion}</p>
                    <div className="card-actions justify-end">
                        <button onClick={()=>handleClick(fundacion.id)} className="btn btn-primary">Ver</button>
                    </div>
                </div>
            </div>
            )
        )
    )
}

export default Fundaciones