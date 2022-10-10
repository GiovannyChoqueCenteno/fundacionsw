import React, { useEffect, useState } from 'react'
import { IoAddCircleOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import ModalLabel from '../../../components/elements/ModalLabel'

import imageDefault from '../../../assets/image/defaultImage.jpg';
import { remove } from '../../../utils/messages';
import { aumentarSaldo, deleteBill, getAllBills, getOneFundacion, restarSaldo, saveBill, updateBill } from '../../../services/bills/billDB';
import { uploadImageBill } from '../../../services/storage';

const addIcon = <IoAddCircleOutline size={"2em"} color='white' className={"inline-block"} />
const removeIcon = <IoTrashOutline size={"2em"} color='white' className={"inline-block"} />
const editIcon = <IoPencilOutline size={"2em"} color='white' className={"inline-block"} />

// get useParams();
const fundacionId = "Z26sqUdZ8mf9L0WljzPI";

const Bills = () => {

    const [bills, setbill] = useState(null);
    const [saldo, setsaldo] = useState(null);

    const createBill = async (e) => {
        e.preventDefault();
        let titulo = e.target.children[0].children[1];
        let descripcion = e.target.children[1].children[1];
        let costo = e.target.children[2].children[1];
        let file = e.target.children[3].children[2];
        let checkBox = document.getElementById("modalCreateBill").parentElement.children[1];
        checkBox.checked = false;
        try {
            let urlImage = await uploadImageBill(file.files[0]);
            await saveBill({ titulo: titulo.value, descripcion: descripcion.value, costo: costo.value, fundacionId, urlImage });
            let saldoActualizado = await restarSaldo(fundacionId, costo.value);
            setsaldo(saldoActualizado);
        } catch (error) {
            alert("Error al createBill")
        }
        await getBills();
        resetCreate(titulo, descripcion, costo, file)
    }

    const resetCreate = (titulo, descripcion, costo, file) => {
        titulo.value = "";
        descripcion.value = "";
        costo.value = "";
        file.value = "";
    }

    const editBill = async (e) => {
        e.preventDefault();
        let billId = e.target.children[0].value;
        let titulo = e.target.children[1].children[1].value;
        let costo = e.target.children[2].value;
        let descripcion = e.target.children[3].children[1].value;
        let file = e.target.children[4].children[2];
        let urlImage = e.target.children[4].children[1].children[0].src;
        let checkbox = e.target.parentElement.parentElement.parentElement.parentElement.children[1];
        checkbox.checked = false;
        const data = { titulo, descripcion, fundacionId, urlImage, costo: Number(costo) };
        try {
            if (file.files[0] != undefined) {
                let urlImage = await uploadImageBill(file.files[0]);
                data.urlImage = urlImage;
            }
            await updateBill(billId, data);
        } catch (error) {
            alert("Error al editBill")
        }
        getBills();
        file.value = "";
    }

    const removeBill = async (gastoId, monto) => {
        try {
            await deleteBill(gastoId);
            let saldoActualizado = await aumentarSaldo(fundacionId, monto);
            setsaldo(saldoActualizado);
        } catch (error) {
            alert("Error al removeBill")
        }
        getBills();
    }

    const getBills = async () => {
        try {
            let data = await getAllBills(fundacionId);
            setbill(data);
        } catch (error) {
            alert("Failed: getBills");
            setbill([]);
        }
    }

    const getFundacion = async () => {
        const fundacion = await getOneFundacion(fundacionId);
        setsaldo(fundacion.data().saldo);
    }

    useEffect(() => {
        getFundacion();
        getBills();
    }, []);

    return (
        <div className={'grow flex justify-center items-start pt-5'}>
            <div className='w-1/2'>
                <ModalLabel title={"Crear"} openModalText={addIcon} modalId={"modalCreateBill"} btnStyle={"btn-prim"} contentStyle={"my-1"}>
                    <form onSubmit={createBill} className='my-5' encType="multipart/form-data">
                        <div>
                            <label>Titulo</label>
                            <input
                                type="text"
                                minLength={3}
                                required
                                className="input input-bordered w-full block"
                                placeholder={"Titulo..."}
                            />
                        </div>
                        <div>
                            <label>Descripcion</label>
                            <textarea
                                required
                                minLength={10}
                                className="text-decoration-none textarea textarea-bordered resize-none block my-1 w-full"
                                rows={3}
                                placeholder={"Descripcion..."}
                            ></textarea>
                        </div>
                        <div>
                            <label>Costo</label>
                            <input
                                required
                                type="number"
                                min={0}
                                className="input input-bordered w-full block"
                                placeholder={"Costo..."}
                            />
                        </div>
                        <div>
                            <label>Imagen</label>
                            <div className={"h-40"} >
                                <img src={imageDefault} className={"h-full rounded-md object-cover"} alt={"imageUpload"} />
                            </div>
                            <input
                                type={"file"}
                                required
                                accept="image/*"
                                className={"input input-bordered w-full block my-1"}
                            />
                        </div>
                        <div className='mt-4'>
                            <button type={"submit"} className={"btn-prim"}>
                                crear
                            </button>
                        </div>
                    </form>
                </ModalLabel>

                <h5 className='my-2 text-end'>Saldo : {saldo} bs</h5>

                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th className={"bg-theme-primary text-white"}>titulo</th>
                            <th className={"bg-theme-primary text-white"}>costo</th>
                            <th className={"bg-theme-primary text-white"}>acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (bills == null)
                                ? (
                                    <tr>
                                        <td colSpan={3}>
                                            <small>loading...</small>
                                        </td>
                                    </tr>
                                )
                                : (
                                    bills.map((bill) => (
                                        <tr key={bill.id}>
                                            <td>{bill.titulo}</td>
                                            <td>{bill.costo}</td>
                                            <td className={"flex space-x-2 justify-center"}>

                                                <ModalLabel title={"Detalle"} openModalText={editIcon} modalId={`modalDetalle/${bill.id}`} btnStyle={"btn-prim"}>
                                                    <form onSubmit={editBill} className='my-5'>
                                                        <input
                                                            type="hidden"
                                                            defaultValue={bill.id}
                                                        />
                                                        <div>
                                                            <label>Titulo</label>
                                                            <input
                                                                type="text"
                                                                required
                                                                minLength={3}
                                                                className="input input-bordered w-full block"
                                                                placeholder={"detalles"}
                                                                defaultValue={bill.titulo}
                                                            />
                                                        </div>
                                                        <input
                                                            type="hidden"
                                                            defaultValue={bill.costo}
                                                        />
                                                        <div>
                                                            <label>Descripcion</label>
                                                            <textarea
                                                                required
                                                                minLength={10}
                                                                className="text-decoration-none textarea textarea-bordered resize-none block my-1 w-full"
                                                                rows={3}
                                                                defaultValue={bill.descripcion}
                                                            ></textarea>
                                                        </div>
                                                        <div>
                                                            <label>Imagen</label>
                                                            <div className={"h-40"}>
                                                                <img src={(bill.urlImage.length) > 0 ? bill.urlImage : imageDefault} className={"h-full rounded-md object-cover"} alt={"imagenUpload"} />
                                                            </div>
                                                            <input
                                                                type={"file"}
                                                                accept="image/*"
                                                                className={"input input-bordered w-full block my-1"}
                                                            />
                                                        </div>
                                                        <div className='mt-4'>
                                                            <button type={"submit"} className='btn-prim'>
                                                                editar
                                                            </button>
                                                        </div>
                                                    </form>
                                                </ModalLabel>

                                                <ModalLabel title={"eliminar"} openModalText={removeIcon} modalId={`modalDelete/${bill.id}`} btnStyle={"btn-dang"}>
                                                    <div className='mt-4'>
                                                        <div className={"my-4"}>
                                                            <h3>{remove}</h3>
                                                        </div>
                                                        <div>
                                                            <label htmlFor={`#modalDelete/${bill.id}`} onClick={() => removeBill(bill.id, bill.costo)} className='btn-custom btn-prim no-underline cursor-pointer'>
                                                                confirmar
                                                            </label>
                                                            <label htmlFor={`#modalDelete/${bill.id}`} className='btn-custom btn-prim no-underline cursor-pointer'>
                                                                cerrar
                                                            </label>
                                                        </div>
                                                    </div>
                                                </ModalLabel>

                                            </td>
                                        </tr>
                                    ))
                                )
                        }
                    </tbody>

                </table>
            </div>
        </div>

    )
}

export default Bills