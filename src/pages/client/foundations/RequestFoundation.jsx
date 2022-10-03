import React, { useState } from 'react'

import useForm from '../../../hooks/useForm'
import { dummyImage } from '../../../utils/constants'
import { uploadImageProfile } from '../../../services/storage'
import { saveRequest } from '../../../services/requestFoundation'
import { useEffect } from 'react'
import { getAllCategories } from '../../../services/categories/categoryDB'
const RequestFountaion = () => {
    const [image, setImage] = useState(dummyImage)
    const [file, setFile] = useState(null)
    const { form, handleChange } = useForm({
        nombre: '',
        correo: '',
        descripcion: '',
        telefono : 0,
        direccion : '',
        idCategoria : 0,
        idDepartamento : 0
    });
    const [categories, setCategories] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = await uploadImageProfile(file);
        console.log(form)
        saveRequest({...form , urlImagen : url , estado : 1})
    }
    const imageHandler = (event) => {
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
    useEffect(()=>{
        getData()
    },[])


    const getData = async()=>{
        const categories= await getAllCategories();
        setCategories(categories)
    }

    return (
        <div className='container mx-auto  mt-5'>
            <h1 className='text-center font-bold text-4xl text-gray-400'>Registrar mi fundacion</h1>
            <form onSubmit={handleSubmit} className='w-1/2 mx-auto mt-5'>
                <div className='form-control items-center mb-3'>
                    <label>
                        <img className="object-cover h-full"
                            src={image}
                            alt={''} />
                        <input required type="file" className={'hidden'} accept={'image/*'} onChange={imageHandler} />
                    </label>
                </div>
                {!file  &&  <span className='text-error'>Seleccionar Imagen</span>}
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
                <div className='flex gap-4'>
                    <div className='flex flex-col flex-1'>
                        <label htmlFor="">Seleccionar Departamento</label>
                        <select  value={form.idCategoria} name="idCategoria" id="" onChange={handleChange}>
                            <option value={0} defaultValue disabled>Seleccionar Categoria </option>
                            <option value={1}  >Categoria 1 </option>

                        </select>

                    </div>
                    <div className='flex flex-col flex-1'>

                        <label htmlFor="">Seleccionar Categoria</label>
                        <select value={form.idDepartamento} onChange={handleChange} name="idDepartamento" id="1">
                            {categories.map(category =>(
                                <option value={category.id}>{category.nombre}</option>
                            ))}

                        </select>
                    </div>
                </div>
                <input className='hover:cursor-pointer btn-prim mt-5' type="submit" value="Enviar Solicitud" />
            </form>
        </div>

    )
}

export default RequestFountaion