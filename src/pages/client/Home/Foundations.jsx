import React from 'react'
import { useNavigate } from 'react-router-dom'
import { fundaciones } from '../../../utils/mocks/fundacion'


const Fundaciones = () => {

    const navigate = useNavigate();

    const handleClick = (id_fundacion) => {
        navigate(`/fundacion/${id_fundacion}`)
    }

    return (
        fundaciones.map( fundacion =>(
            <div key={fundacion.id} onClick={()=>handleClick(fundacion.id)} className="card w-full bg-base-100 shadow-xl hover:cursor-pointer hover:translate-y-1 hover:bg-slate-400">
                <figure><img src={fundacion.urlImagen} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{fundacion.nombre}</h2>
                    <p>{fundacion.descripcion}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleClick(fundacion.id)} className="btn btn-primary">Ver</button>
                    </div>
                </div>
            </div>
        )
        )
    )
}

export default Fundaciones