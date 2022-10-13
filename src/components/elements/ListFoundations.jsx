import React,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const ListFoundations = ({foundations}) => {

  const [loading,setLoading] = useState(true)

  const navigate = useNavigate();
  const handleClick = (id_fundacion) => {
    navigate(`/foundation/${id_fundacion}`)
}
  useEffect(()=>{
    setLoading(true)
    if (foundations.length>0)
    setLoading(false)
  },[foundations])
  return (
  
    loading?
  <>
    <div>
    </div>
    <div>
    <img src="./loading.gif"   />
    </div>
    </>
   :
    foundations.map( fundacion =>(
        <div key={fundacion.id} onClick={()=>handleClick(fundacion.id)} className="card w-full bg-base-100 shadow-xl hover:cursor-pointer hover:translate-y-1 hover:bg-slate-400">
            <figure><img src={fundacion.urlImagen} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{fundacion.nombre}</h2>
                <p>{fundacion.descripcion}</p>
               
            </div>
        </div>
    )
    )
  )
}

export default ListFoundations