
import React from 'react'
import { useEffect , useState } from 'react';
import { useParams , useNavigate, Link} from 'react-router-dom'
import { getFoundation } from '../../../services/foundation';
const DetailsMyFoundation = ({fundacion}) => {
    const navigate = useNavigate();
    return (
        <div className='container mx-auto  mt-5'>
            <div className='flex flex-col gap-4 items-center'>
                <div>
                    <h1 className='text-secondary text-4xl'>{fundacion.nombre}</h1>
                </div>
                <div>
                    <img src={fundacion.urlImagen} alt={fundacion.nombre}  />
                </div>
                <div className='w-1/3 text-center'>
                    {fundacion.descripcion}
                </div>
                <div>
                    <h2 className='text-gray-800 font-bold text-2xl'>Informacion</h2>
                </div>
                <div className='flex justify-between w-1/4'>
                    <div className='font-semibold'>
                        Correo
                    </div>
                    <div>
                        {fundacion.correo}
                    </div>
                </div>
                <div className='flex justify-between w-1/4'>
                    <div className='font-semibold'>
                        Telefono
                    </div>
                    <div>
                        {fundacion.telefono}
                    </div>
                </div>
                <a className='link-neutral hover:text-primary cursor-pointer' href={fundacion.urlIUbicacion} target="_blank">Ver ubicacion</a>
                <div className='flex justify-between w-1/4'>
                <Link className='btn btn-secondary'
                    to={`/client/payments/${fundacion.id}`}
                >Ver donaciones</Link>
                <button onClick={()=>{
                    navigate(`/client/bills/${fundacion.id}`)
                }} className='btn btn-primary'>
                    Ver mis pagos
                </button>
                </div>

            </div>
        </div>
    
    )
            
}

export default DetailsMyFoundation