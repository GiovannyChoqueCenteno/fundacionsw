import React from 'react'
import { useState } from 'react'
import Modal from '../../../components/elements/Modal'
import { remove } from '../../../utils/messages'
import { getAllDeparments, saveDeparment, deleteDeparment, updateDeparment } from '../../../services/deparments/deparmentDB'
import { useEffect } from 'react'

const initialState = {
    nombre: "",
}

const updateState = {
    nombre: "",
}

const Department = () => {
    const [DeparmentList, setDeparmentList] = useState([]);
    const getDepartments = async () => {
        const departments = await getAllDeparments()
        setDeparmentList(departments)
    }
    useEffect(() => {
        getDepartments()
    }, [])

    const [deparment, SetDeparment] = useState(initialState)
    const handleInputChange = ({ target: { name, value } }) =>
        SetDeparment({ ...deparment, [name]: value })
    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveDeparment(deparment)
        await getDepartments()
    }

    const [deparmentUpdate, SetDeparmentUpdate] = useState(updateState)
    const handleInputChangeUpdate = ({ target: { name, value } }) => {
        console.log(name, value)
        SetDeparmentUpdate({ ...deparmentUpdate, [name]: value })
    }
    const handleUpdate = async (id) => {
        console.log(deparmentUpdate)
        await updateDeparment(id, deparmentUpdate)
        await getDepartments()
    }

    const handleDelete = async (id) => {
        await deleteDeparment(id)
        await getDepartments()
    }

    return (
        <div className={'grow justify-center items-start pt-5 m-8'}>
            <div className="overflow-x-auto">
                <Modal title={"Crear"} openModalText={"Agregar"} modalId={"modalAdd"} btnStyle={"btn-prim"} contentStyle={"my-5"} >
                    <form className='my-5' onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre</label>
                            <input type="text"
                                placeholder="name..."
                                name='nombre'
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className='mt-4'>
                            <button type='submit' className='btn-custom btn-prim no-underline'>
                                crear
                            </button>
                        </div>
                    </form>
                </Modal>
                <table className="table  w-full table-zebra text-center">
                    <thead>
                        <tr>
                            <th className={"bg-theme-primary text-white"}>Nombre</th>
                            <th className={"bg-theme-primary text-white"}>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            DeparmentList.map((categoria) => (
                                <tr key={categoria.id.toString()}>
                                    <td>{categoria.nombre}</td>
                                    <td>
                                        <div className='grid inline-grid grid-cols-2'>
                                            <Modal title={"Editar"} openModalText={"Editar"} modalId={`ModalEdit/${categoria.id}`} btnStyle={"btn-prim"}>
                                                <form className='my-5'>
                                                    <div>
                                                        <label>Nombre</label>
                                                        <input
                                                            type="text"
                                                            name="nombre"
                                                            value={deparmentUpdate.nombre}
                                                            onChange={handleInputChangeUpdate}
                                                            className="input input-bordered w-full"
                                                        />
                                                    </div>
                                                    <div className='mt-4'>
                                                        <button type='button' onClick={() => handleUpdate(categoria.id)} className='btn-custom btn-prim no-underline'>
                                                            actualizar
                                                        </button>
                                                    </div>
                                                </form>
                                            </Modal>
                                            <Modal title={"Eliminar"} openModalText={"Eliminar"} modalId={`ModalDelete/${categoria.id}`} btnStyle={"btn-dang"}>
                                                <div className='mt-4'>
                                                    <div className={"my-4"}>
                                                        <h3>{remove}</h3>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleDelete(categoria.id)} className='btn-custom btn-prim no-underline'>
                                                            confirmar
                                                        </button>
                                                        <a href="#" className='btn-custom btn-dang no-underline ml-2'>
                                                            cerrar
                                                        </a>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Department