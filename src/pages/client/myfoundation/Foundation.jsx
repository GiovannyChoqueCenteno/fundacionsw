import React from 'react'
import { useEffect , useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { getFoundationByUser } from '../../../services/foundation'
import DetailsMyFoundation from './DetailsMyFoundation'
import PendingFoundation from './PendingFoundation'
import RerequestFoundation from './RerequestFoundation'
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
        if(fundacion) {
            if(fundacion.estado==1){
                return <PendingFoundation />
            }
            if(fundacion.estado==2){
                return <DetailsMyFoundation fundacion={fundacion} />
            }
            if(fundacion.estado==3){
                return <RerequestFoundation foundation={fundacion} />
            }
        }else{
        return <RequestFountaion  />
           
        }
    }
  return (
            <FoundationComponent />

  )
}

export default Foundation