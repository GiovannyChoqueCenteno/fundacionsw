import React from 'react'
import { useState } from 'react'
import Modal from '../../../components/elements/Modal'
import { remove } from '../../../utils/messages'
import { getAllDeparments, saveDeparment, deleteDeparment, updateDeparment } from '../../../services/deparments/deparmentDB'
import { useEffect } from 'react'
import { IoTrashOutline, IoAddCircleOutline, IoPencilOutline } from 'react-icons/io5';
import ModalLabel from '../../../components/elements/ModalLabel'

const addIcon = <IoAddCircleOutline size={"2em"} color='white' className={"inline-block"} />
const removeIcon = <IoTrashOutline size={"2em"} color='white' className={"inline-block"} />
const editIcon = <IoPencilOutline size={"2em"} color='white' className={"inline-block"} />

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
        <div className={'grow flex justify-center items-start pt-5 m-8'}>
            <div className="w-1/2">
                <ModalLabel title={"Crear"} openModalText={addIcon} modalId={"modalAddLabel1"} btnStyle={"btn-prim"} contentStyle={"my-5"} >
                    <div className='my-5' onSubmit={handleSubmit}>
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
                            <label htmlFor={"#modalAddLabel1"} onClick={handleSubmit} className='btn-custom btn-prim no-underline cursor-pointer'>
                                Crear
                            </label>
                        </div>
                    </div>
                </ModalLabel>
                <table className="table  w-full table-zebra text-center">
                    <thead>
                        <tr>
                            <th className={"bg-theme-primary text-white"}>Nombre</th>
                            <th className={"bg-theme-primary text-white"}>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            DeparmentList.map((department) => (
                                <tr key={department.id.toString()}>
                                    <td>{department.nombre}</td>
                                    <td>
                                        <div className='grid inline-grid grid-cols-2'>
                                            <ModalLabel title={"Editar"} openModalText={editIcon} modalId={`modalEdit/${department.id}`} btnStyle={"btn-prim"}>
                                                <div className='my-5'>
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
                                                        <label htmlFor={`#modalEdit/${department.id}`} onClick={() => handleUpdate(department.id)} className='btn-custom btn-prim no-underline cursor-pointer'>
                                                            Editar
                                                        </label>
                                                    </div>
                                                </div>
                                            </ModalLabel>
                                            <ModalLabel title={"Eliminar"} openModalText={removeIcon} modalId={`ModalDelete/${department.id}`} btnStyle={"btn-dang"}>
                                                <div className='mt-4'>
                                                    <div className={"my-4"}>
                                                        <h3>{remove}</h3>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => handleDelete(department.id)} className='btn-custom btn-prim no-underline'>
                                                            Confirmar
                                                        </button>
                                                        <a href="#" className='btn-custom btn-dang no-underline ml-2'>
                                                            Cerrar
                                                        </a>
                                                    </div>
                                                </div>
                                            </ModalLabel>
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