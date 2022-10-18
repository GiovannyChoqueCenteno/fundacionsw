import React, { useEffect, useState ,useRef } from 'react'
import { IoAddCircleOutline, IoPencilOutline, IoTrashOutline } from 'react-icons/io5'
import ModalLabel from '../../../components/elements/ModalLabel'
import { AiFillFilePdf } from 'react-icons/ai'
import { jsPDF } from 'jspdf'

import { useParams } from 'react-router-dom';
import { getAllPaymentsByFoundation } from '../../../services/payments/paymentDB';



// get useParams();

const Payments = () => {
    const {id} = useParams();
    const [payments, setPayments] = useState([]);

    const pdfRef = useRef()
    const handleDownload = () => {
        const content = pdfRef.current;

        const doc = new jsPDF({
            format: "a4",
            unit: "px"
        });
        doc.html(content, {
            callback: function (doc) {
                doc.save('donaciones.pdf');
            },
            html2canvas: { scale: 0.5 } // change the scale to whatever number you need
        });

    };
    useEffect(() => {
        getPayments();
    }, []);

    const getPayments = async()=>{
        const res = await getAllPaymentsByFoundation(id);
        setPayments(res)
    }

    return (
        <>
        <div className={'grow flex justify-center items-start pt-5'}>
            <div className='w-1/2'>
                
            <button onClick={handleDownload} className='btn btn-secondary'>{<AiFillFilePdf />} </button>

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
        <ModalLabel>
        <div className='w-screen' ref={pdfRef}  >
                     
                     <h1 class='text-4xl text-center text-gray-600 mb-6 mt-4'>Lista de Donaciones</h1>
                     <div class='w-2/3 mx-auto'>
                         <table class="table w-full text-center">
                             <thead class='border'>
                                 <tr>
                                     <th >mensaje</th>
                                     <th >monto</th>
                                 </tr>
                             </thead>
 
                             <tbody>
 
                                 {payments.map((payment) => (
                                     <tr key={payment.id}>
                                            <td>{payment.message} </td>
                                            <td>{payment.amount} $</td>
                                     </tr>
                                 ))}
    
 
                             </tbody>
 
                         </table>
                     </div>
                 </div>
                
        </ModalLabel>
        </>
    )
}

export default Payments