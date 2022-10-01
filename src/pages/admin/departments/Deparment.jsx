import React from 'react'
import Modal from '../../../components/elements/Modal'
import { remove } from '../../../utils/messages'
import { departments } from '../../../utils/mocks/departments'

const Department = () => {

    return (
        <div className={'grow justify-center items-start pt-5 m-8'}>
            <div className="overflow-x-auto">
                <Modal title={"Crear"} openModalText={"Agregar"} modalId={"modalAdd"} btnStyle={"btn-prim"} contentStyle={"my-5"} >
                    <form className='my-5'>
                        <div>
                            <label>Nombre</label>
                            <input type="text" placeholder="name..." className="input input-bordered w-full" />
                        </div>
                        <div className='mt-4'>
                            <a href="#" className='btn-custom btn-prim no-underline'>
                                crear
                            </a>
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
                            departments.map((categoria) => (
                                <tr key={categoria.id.toString()}>
                                    <td>{categoria.nombre}</td>
                                    <td>
                                        <div className='grid inline-grid grid-cols-2'>
                                            <Modal title={"Editar"} openModalText={"Editar"} modalId={"modalEdit"} btnStyle={"btn-prim"}>
                                                <form className='my-5'>
                                                    <div>
                                                        <label>Nombre</label>
                                                        <input type="text" placeholder="name..." className="input input-bordered w-full" />
                                                    </div>
                                                    <div className='mt-4'>
                                                        <a href="#" className='btn-custom btn-prim no-underline'>
                                                            actualizar
                                                        </a>
                                                    </div>
                                                </form>
                                            </Modal>
                                            <Modal title={"Eliminar"} openModalText={"Eliminar"} modalId={"modalDelete"} btnStyle={"btn-dang"}>
                                                <div className='mt-4'>
                                                    <div className={"my-4"}>
                                                        <h3>{remove}</h3>
                                                    </div>
                                                    <div>
                                                        <a href="#" className='btn-custom btn-prim no-underline'>
                                                            confirmar
                                                        </a>
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