import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getAllBillsAndTotal } from '../../../services/bills/billDB';
import { getFoundation } from '../../../services/foundation';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar  ,Doughnut  } from 'react-chartjs-2';

ChartJS.register(ArcElement,Tooltip,Legend ,CategoryScale, LinearScale, BarElement);

const FoundationBill = () => {

    const { foundationId } = useParams();
    const [loading, setloading] = useState(true)
    const [foundation, setfoundation] = useState({});
    const [bills, setbills] = useState([]);
    const [gastoTotal, setgastoTotal] = useState(0);

    async function getBillsFundation() {
        try {
            let { data, gastoTotal } = await getAllBillsAndTotal(foundationId);
            setbills(data);
            setgastoTotal(gastoTotal);
        } catch (error) {
            console.log(`getBillsFundation: ` + error);
            alert("Not load Bills!!!");
        }
    }

    async function getDataFundation() {
        try {
            let data = await getFoundation(foundationId);
            setfoundation(data);
        } catch (error) {
            console.log(`getDataFundation: ` + error);
            alert("Not load Foundation!!!");
        }
    }

    async function loadData(params) {
        await getDataFundation();
        await getBillsFundation();
        setloading(false);
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <div className={'grow flex justify-center items-start pt-5'}>
            <div className={"container"}>

                <h2 className='font-bold text-theme-primary text-xl'>Gastos de la fundacion</h2>

                {
                    loading
                        ? <img src="/loading.gif" className='mx-auto' />
                        : (
                            <>
                                <div className='my-2'>
                                    <div className='w-1/2 mx-auto'>
                                        <h1 className='text-center font-bold text-theme-primary text-md'>
                                            SALDO: {foundation.saldo} $
                                        </h1>
                                        <Bar data={{
                                            labels: [`Donaciones:${foundation.saldo + gastoTotal} $`, `Gastos:${gastoTotal} $`],
                                            datasets: [
                                                {
                                                    data: [foundation.saldo + gastoTotal, gastoTotal],
                                                    backgroundColor: ['#525c8b', '#ff5b5b'],
                                                }
                                            ],
                                            
                                        } } />
                                      
                                        <Doughnut 
                                        className='pt-5'
                                        data={{
                                            labels: [`Donaciones:`, `Gastos:`],
                                            datasets: [
                                                {
                                                    label: 'Datos estadisticos',
                                                    data: [foundation.saldo + gastoTotal, gastoTotal],
                                                    backgroundColor: ['#525c8b', '#ff5b5b'],
                                                    borderWidth: 1,
                                                }
                                            ],
                                        }
                                    }
                                        />
                                    </div>
                                </div>

                                <div>
                                    {
                                        bills.map((bill) => (
                                            <div key={bill.id} className="card border shadow-md  grid grid-cols-4 my-5 p-2">
                                                <figure className='h-100 object-cover w-40'>
                                                    <img src={bill.urlImage ? bill.urlImage : 'https://placeimg.com/400/400/arch '} alt="Album" />
                                                </figure>
                                                <div className="card-body col-span-3 ">
                                                    <h2 className="card-title">{bill.titulo}</h2>
                                                    <p>{bill.descripcion}</p>
                                                    <p>monto: {bill.costo} $</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                }

            </div>
        </div>
    )
}

export default FoundationBill