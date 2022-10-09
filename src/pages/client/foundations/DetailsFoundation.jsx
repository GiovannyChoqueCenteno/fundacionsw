
import React from 'react'
import { useEffect , useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom'
import { getFoundation } from '../../../services/foundation';
import { acceptRequest, getRequest } from '../../../services/requestFoundation';
import Payment from '../../../components/elements/Payment'
import Modal from "../../../components/elements/Modal.jsx";
import PayPage from "../../../components/elements/PayPage.jsx";
const DetailsFoundation = () => {
    const [donate,setDonate]=useState(false);
    const data = useParams();
    

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

                <Modal title={"Realizar donación"} openModalText={"Realizar donación"} modalId={"pay"} btnStyle={"btn-prim"} contentStyle={"my-5"} >
                    <PayPage fundacion_id={fundacion.id}></PayPage>
                    {/*<Payment setDonate={setDonate} fundacion_id={fundacion.id}/>*/}
                </Modal>
              {/*  <a className='btn btn-primary'> Realizar Donacion</a>*/}


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
    
    )
            
}

export default DetailsFoundation