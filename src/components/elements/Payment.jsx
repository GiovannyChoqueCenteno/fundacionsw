import React, {useEffect, useState} from 'react'
import {loadStripe} from "@stripe/stripe-js";
import {getUser} from "../../services/auth.js";
import {savePayment} from "../../services/payments/paymentDB.js";



import {
    AiOutlineCheckCircle,
    MdErrorOutline,
    TbLoader
} from "react-icons/all.js";


function Payment(props) {
    let stripe;
    let card;

    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paying, setPaying] = useState(false);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');

    async function startStripe() {
        stripe = await loadStripe('pk_test_51K4spRGtyN68xBAjFJ2oqY1tjcb4B7ATKTfFYWxCAlEKzlZrzLLmsFe5um4fOxcwm1omz6X8ysZAkMpm1qrUwlum00FYVkizBD');
        if (stripe) {
            const elements = stripe.elements();
            card = elements.create('card');
            card.mount('#card');

            card.on('change', (event) => {
                const displayError = document.getElementById('card-errors');
                if (displayError)
                    event.error ? displayError.textContent = event.error.message : displayError.textContent = '';
            });
        }
    }

    useEffect(() => {
        startStripe().then(() => {
            console.log('initialized');
        });
    }, []);


    const pay = async () => {
        if(message==="" || amount===0){
            return;
        }
        console.log('payment started')
        const user = getUser();
        const ownerInfo = {
            owner: {name: user.displayName?user.displayName:'unknown'},
            amount: amount * 100,
            currency: 'USD'
        };
        console.log(ownerInfo);
        setPaying(true)
        setProcessing(true);

        console.log('init process')
        stripe?.createSource(card, ownerInfo).then(res => {
            setProcessing(false)
            console.log(res)
            const stripeId = res.source.id
            setSuccess(true);
            savePayment({
                stripe_id: stripeId,
                user_id: user.uid,
                user_name: user.displayName,
                fundacion_id: props.fundacion_id,
                message,
                amount
            }).then(() => {
                console.log("payment saved");
            })
        }).catch(e => {
            setProcessing(false);
            setSuccess(false);
            console.log(e)
        });
    }

    return (
        <div className="pt-10">
            <div className="">
                {paying &&
                    <div className={'flex justify-center'}>
                        {processing?
                            <TbLoader className={'animate-spin'} color={'blue'} size={50}/>
                            :<>
                                {success ? <AiOutlineCheckCircle color={'green'} size={50}/> : <MdErrorOutline color={'red'} size={50}/>}
                            </>
                        }
                    </div>
                }
                <div>
                    <label htmlFor="message">{'Mensaje'}</label>
                    <textarea name={'message'}
                              className={'block border p-2 rounded-md w-full outline-theme-secondary'}
                              placeholder={'Escribe un mensaje'}
                              value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
                </div>
                <div className={'my-5'}>
                    <label htmlFor="amount">{'Monto $'}</label>
                    <input name={'amount'} type="number" placeholder={'Monto a donar'} value={amount}
                           onChange={(event) => setAmount(parseInt(event.target.value))}/>
                </div>
                <div id="card"></div>
                <div id="card-errors" className={'text-red-500 mt-5'} role="alert"></div>
                <div className="flex justify-end gap-5 mt-10">
                    <a href="#" className='border px-3 py-2'>
                        {'Cancelar'}
                    </a>
                    <button className="btn-prim" onClick={(e) => pay()}>{'Donar'}</button>
                </div>
            </div>
        </div>
    );
}

export default Payment;