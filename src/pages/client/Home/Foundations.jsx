import React from 'react'
import { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ListFoundations from '../../../components/elements/ListFoundations'
import { getAcceptedFoundations } from '../../../services/foundation'
import { fundaciones } from '../../../utils/mocks/fundacion'


const Fundaciones = () => {

    const [foundations, setFoundations] = useState([])

    const navigate = useNavigate();


    useEffect(()=>{
        getFoundations();
    },[])

    const getFoundations = async()=>{
          const res=await getAcceptedFoundations()
        setFoundations(res);
        
     }

    return (
        <ListFoundations  foundations={foundations}/>
    )
}

export default Fundaciones