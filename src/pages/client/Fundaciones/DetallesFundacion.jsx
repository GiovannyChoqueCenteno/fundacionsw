import React from 'react'
import { useParams } from 'react-router-dom'
import { fundaciones } from '../../../utils/mocks/fundacion';

const DetallesFundacion = () => {
    const data = useParams();
    const fundacion = fundaciones[0];
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
                <a className='link-neutral hover:text-primary' href={fundacion.urlIUbicacion} target="_blank">Ver ubicacion</a>
                <a className='btn btn-primary'> Realizar Donacion</a>

            </div>
        </div>
    )
}

export default DetallesFundacion