import React from 'react'
import { useEffect , useState} from 'react'
import { getRequests } from '../../../services/requestFoundation'
import { onSnapshot } from 'firebase/firestore'
import ConfirmFoundation from './ConfirmFoundation'
import { Link } from 'react-router-dom'
const RequestFoundations = () => {
  const [requestFoundations, setRequestFoundations] = useState([])
  useEffect(()=>{
   const request = getRequests();
   onSnapshot(request , (querySnapshot)=>{
    setRequestFoundations(querySnapshot.docs.map(doc =>{
       return doc.data()
   }) 
   )
})
  },[])
  return (
<div className="container mx-auto">
  <h1 className='text-center font-bold text-4xl'>Lista de Solicitudes</h1>
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
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
          <td>{index+1}</td>
          <td>{requestFoundation.nombre}</td>
          <td>{requestFoundation.correo}</td>
          <td>{requestFoundation.telefono}</td>
          <td className='btn btn-primary'> <Link to={`/fundacion/${requestFoundation.telefono}`}>
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