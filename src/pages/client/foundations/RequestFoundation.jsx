import React ,{useState} from 'react'
import useForm from '../../../hooks/useForm'
import { dummyImage } from '../../../utils/constants'

const RequestFountaion = () => {
    const [image, setImage] = useState(dummyImage)
    const [file, setFile] = useState(null)
    const {form , handleChange} =useForm({
        nombre : '',
        correo : '',
        descripcion : '',
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(form)
    }
    const imageHandler = (event)=> {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setFile(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (_event) => {
                setImage(reader.result?.toString());
            }
        }
    }
  return (
    <div className='container mx-auto  mt-5'>
        <h1 className='text-center font-bold text-4xl text-gray-400'>Registrar mi fundacion</h1>
        <form onSubmit={handleSubmit} className='w-1/2 mx-auto mt-5'>
            <div className='form-control items-center mb-3'>
                <label>
                <img className="object-cover h-full"
                             src={image}
                             alt={''}/>
                        <input  required type="file" className={'hidden'} accept={'image/*'} onChange={imageHandler}/>
                        </label>
            </div>
            <div className='form-control mb-3'>
                <label htmlFor="">Nombre</label>
                <input name='nombre' value={form.nombre} onChange={handleChange} required type="text" />
            </div>
            <div className='form-control mb-3'>
                <label htmlFor="">Descripcion</label>
                <input name='descripcion' value={form.descripcion} onChange={handleChange} required type="text" />
            </div>
            <div className='form-control mb-3'>
                <label htmlFor="">Correo</label>
                <input name='correo' value={form.correo} onChange={handleChange} required type="text" />
            </div>
            <div className='form-control mb-3'>
                <label htmlFor="">Telefono</label>
                <input name='telefono' value={form.telefono} onChange={handleChange} required type="number" />
            </div> 
            <div className='form-control mb-3'>
                <label htmlFor="">Direccion</label>
                <input name='direccion' value={form.direccion} onChange={handleChange} required placeholder='Enlace de google maps' type="text" />
            </div>

            <input className='hover:cursor-pointer btn-prim' type="submit" value="Enviar Solicitud" />
        </form>
    </div>

    )
}

export default RequestFountaion