import React from 'react'
import { useEffect , useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { getFoundationByUser } from '../../../services/foundation'
import RequestFountaion from './RequestFoundation'

const Foundation = () => {
    const {user} = useAuth()
    const [fundacion, setFundacion] = useState({})
    useEffect(()=>{
        obtenerFundacion();
    },[])
    const obtenerFundacion = async()=>{
        console.log(user.email)
        const res =await getFoundationByUser(user.email)
        setFundacion(res)
    }
    const FoundationComponent = ()=>{
        return <RequestFountaion />
        if(fundacion) {
            if(fundacion.estado==1){
                return <h1>Fundacion en Revision</h1> 
            }
            if(fundacion.estado==2){
                return <h2>Informacion de fundacion</h2>
            }
            
        }else{
           
        }
    }
  return (
    <div className='container mx-auto  mt-5'>
            <FoundationComponent />

    </div>
  )
}

export default Foundation