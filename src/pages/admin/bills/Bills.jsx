import React from 'react'
import { IoAddCircleOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import ModalLabel from '../../../components/elements/ModalLabel'

import imageDefault from '../../../assets/image/defaultImage.jpg';
import { remove } from '../../../utils/messages';
import { gastos } from '../../../utils/mocks/gastos';

const addIcon = <IoAddCircleOutline size={"2em"} color='white' className={"inline-block"} />
const removeIcon = <IoTrashOutline size={"2em"} color='white' className={"inline-block"} />
const editIcon = <IoPencilOutline size={"2em"} color='white' className={"inline-block"} />

const Bills = () => {

    return (
        <div className={'grow flex justify-center items-start pt-5'}>
            <div className='w-1/2'>
                <ModalLabel title={"Crear"} openModalText={addIcon} modalId={"modalAddGastos"} btnStyle={"btn-prim"} contentStyle={"my-1"}>
                    <form className='my-5' encType="multipart/form-data">
                        <div>
                            <label>Titulo</label>
                            <input
                                type="text"
                                className="input input-bordered w-full block"
                                placeholder={"Titulo..."}
                            />
                        </div>
                        <div>
                            <label>Descripcion</label>
                            <textarea
                                className="text-decoration-none textarea textarea-bordered resize-none block my-1 w-full"
                                rows={3}
                                placeholder={"Descripcion..."}
                            ></textarea>
                        </div>
                        <div>
                            <label>Imagen</label>
                            <div className={"h-40"} >
                                <img src={imageDefault} className={"h-full rounded-md object-cover"} alt={"imageUpload"} />
                            </div>
                            <input
                                type={"file"}
                                accept="image/*"
                                className={"input input-bordered w-full block my-1"}
                            />
                        </div>
                        <div className='mt-4'>
                            <button className={"btn-prim"}>
                                crear
                            </button>
                        </div>
                    </form>
                </ModalLabel>

                <h5 className='my-2 text-end'>Saldo : 5000 bs</h5>

                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th className={"bg-theme-primary text-white"}>titulo</th>
                            <th className={"bg-theme-primary text-white"}>acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            gastos.map((gasto) => (
                                <tr key={gasto.id}>
                                    <td>{gasto.titulo}</td>
                                    <td className={"flex space-x-2 justify-center"}>

                                        <ModalLabel title={"Detalle"} openModalText={editIcon} modalId={`modalDetalle/${gasto.id}`} btnStyle={"btn-prim"}>
                                            <form className='my-5'>
                                                <div>
                                                    <label>Titulo</label>
                                                    <input
                                                        type="text"
                                                        className="input input-bordered w-full block"
                                                        placeholder={"detalles"}
                                                        defaultValue={gasto.titulo}
                                                    />
                                                </div>
                                                <div>
                                                    <label>Descripcion</label>
                                                    <textarea
                                                        className="text-decoration-none textarea textarea-bordered resize-none block my-1 w-full"
                                                        rows={3}
                                                        defaultValue={gasto.descripcion}
                                                    ></textarea>
                                                </div>
                                                <div>
                                                    <label>Imagen</label>
                                                    <div className={"h-40"}>
                                                        <img src={imageDefault} className={"h-full rounded-md object-cover"} alt={"imagenUpload"} />
                                                    </div>
                                                    <input
                                                        type={"file"}
                                                        className={"input input-bordered w-full block my-1"}
                                                    />
                                                </div>
                                                <div className='mt-4'>
                                                    <button type='submit' className='btn-prim'>
                                                        editar
                                                    </button>
                                                </div>
                                            </form>
                                        </ModalLabel>

                                        <ModalLabel title={"eliminar"} openModalText={removeIcon} modalId={`modalDelete/${gasto.id}`} btnStyle={"btn-dang"}>
                                            <div className='mt-4'>
                                                <div className={"my-4"}>
                                                    <h3>{remove}</h3>
                                                </div>
                                                <div>
                                                    <label htmlFor={`#modalDelete/1`} className='btn-custom btn-prim no-underline cursor-pointer'>
                                                        confirmar
                                                    </label>
                                                    <label htmlFor={`#modalDelete/1`} className='btn-custom btn-prim no-underline cursor-pointer'>
                                                        cerrar
                                                    </label>
                                                </div>
                                            </div>
                                        </ModalLabel>

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

export default Bills