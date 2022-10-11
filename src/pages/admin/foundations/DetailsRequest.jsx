import React from 'react'
import { useEffect , useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import { getFoundation, getFoundationByUser } from '../../../services/foundation';
import { acceptRequest, getRequest, rejectRequest } from '../../../services/requestFoundation';

const DetailsRequest = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [request, setRequest] = useState(null)
    useEffect(()=>{
        obtenerFundacion()    
    }
    ,[])
    const navigate = useNavigate();
    const obtenerFundacion =async()=>{
        const getRequestData  = await getRequest(id)
        setRequest(getRequestData)
    }
    const acceptFoundation = async()=>{
        const dataFoundaion=await getFoundationByUser(request.correo);
        await acceptRequest(id,request , dataFoundaion.id);
        navigate('/admin/solicitudes' ,{
            replace : true
        })
    }
    const rejectFoundation = async()=>{
        const dataFoundaion=await getFoundationByUser(request.correo);
        await rejectRequest(id, dataFoundaion.id);
        navigate('/admin/solicitudes' ,{
            replace : true
        })
    }
    return (
        request && <div className='container mx-auto  mt-5'>
        <div className='flex flex-col gap-4 items-center'>
            <div>
                <h1 className='text-secondary text-4xl'>{request.nombre}</h1>
            </div>
            <div>
                <img src={request.urlImagen} alt={request.nombre}  />
            </div>
            <div className='w-1/3 text-center'>  
                {request.descripcion}
            </div>
            <div>
                <h2 className='text-gray-800 font-bold text-2xl'>Informacion</h2>
            </div>
            <div className='flex justify-between w-1/4'>
                <div className='font-semibold'>
                    Correo
                </div>
                <div>
                    {request.correo}
                </div>
            </div>
            <div className='flex justify-between w-1/4'>
                <div className='font-semibold'>
                    Telefono
                </div>
                <div>
                    {request.telefono}
                </div>
            </div>

            <a className='link-neutral hover:text-primary' href={request.urlIUbicacion} target="_blank">Ver ubicacion</a>
            <div className='flex justify-between w-1/4'>
                <div>
                <a className='btn btn-primary' onClick={acceptFoundation}>Aceptar Solicitud</a>

                </div>
            <div>
            <a className='btn btn-error' onClick={rejectFoundation}>Rechazar Solicitud</a>

            </div>

            </div>

        </div>
    </div>
    
    )
            
}

export default DetailsRequest