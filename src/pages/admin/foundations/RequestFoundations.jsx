import React from 'react'
import { useEffect , useState} from 'react'
import { getRequests } from '../../../services/requestFoundation'
import { onSnapshot } from 'firebase/firestore'
import ConfirmFoundation from './ConfirmFoundation'
import { Link } from 'react-router-dom'
const RequestFoundations = () => {
  const [requestFoundations, setRequestFoundations] = useState([])
  useEffect(()=>{
   getRequestFoundations();
  },[])
  const getRequestFoundations = async()=>{
    const request = await getRequests();
    console.log(request)
    setRequestFoundations(request)
  }
  return (
<div className="container mx-auto">
  <h1 className='text-center font-bold text-4xl'>Lista de Solicitudes</h1>
  <table className="table w-full">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Telefono</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {requestFoundations.map((requestFoundation,index)=>(
        <>
        <tr key={index}>
          <td>{requestFoundation._id}</td>
          <td>{requestFoundation.nombre}</td>
          <td>{requestFoundation.correo}</td>
          <td>{requestFoundation.telefono}</td>
          <td > <Link className='btn btn-primary' to={`/fundacion/${requestFoundation._id}`}>
             Ver Solicitud 
             </Link>
             </td>

      </tr>

            </>
      
      ))}
      
    </tbody>
  </table>
</div>
  )
}

export default RequestFoundations