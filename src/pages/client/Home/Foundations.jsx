import React from 'react'
import { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ListFoundations from '../../../components/elements/ListFoundations'
import { getAcceptedFoundations } from '../../../services/foundation'
import { fundaciones } from '../../../utils/mocks/fundacion'
import {IconBase} from 'react-icons'
import  {AiOutlineLoading} from 'react-icons/ai'

const Fundaciones = () => {

    const [foundations, setFoundations] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        getFoundations();
    },[])

 

    const getFoundations = async()=>{
          const res=await getAcceptedFoundations()
        setFoundations(res);
        
     }

    return (
         foundations.length===0?
             
             <img src="./loading.gif" className='text-center' />
            :
            <ListFoundations  foundations={foundations}/>
    )
}

export default Fundaciones