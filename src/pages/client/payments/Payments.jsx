import React, { useEffect, useState } from 'react'
import { IoAddCircleOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import ModalLabel from '../../../components/elements/ModalLabel'

import imageDefault from '../../../assets/image/defaultImage.jpg';
import { remove } from '../../../utils/messages';
import { uploadImageBill } from '../../../services/storage';
import { useParams } from 'react-router-dom';
import { getAllPaymentsByFoundation } from '../../../services/payments/paymentDB';

const addIcon = <IoAddCircleOutline size={"2em"} color='white' className={"inline-block"} />
const removeIcon = <IoTrashOutline size={"2em"} color='white' className={"inline-block"} />
const editIcon = <IoPencilOutline size={"2em"} color='white' className={"inline-block"} />

// get useParams();

const Payments = () => {
    const {id} = useParams();
    const [payments, setPayments] = useState(null);



    useEffect(() => {
        getPayments();
    }, []);

    const getPayments = async()=>{
        const res = await getAllPaymentsByFoundation(id);
        setPayments(res)
    }

    return (
        <div className={'grow flex justify-center items-start pt-5'}>
            <div className='w-1/2'>
                

                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th className={"bg-theme-primary text-white"}>Mensaje</th>
                            <th className={"bg-theme-primary text-white"}>Monto</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (payments == null)
                                ? (
                                    <tr>
                                        <td colSpan={3}>
                                            <small>loading...</small>
                                        </td>
                                    </tr>
                                )
                                : (
                                    payments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td>{payment.message} </td>
                                            <td>{payment.amount} $</td>
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

export default Payments