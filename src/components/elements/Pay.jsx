import React, {useMemo, useState} from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "../../context/useResponsiveFontSize.jsx";
import {savePayment} from "../../services/payments/paymentDB.js";
import {AiOutlineCheckCircle, MdErrorOutline, TbLoader} from "react-icons/all.js";
import {getUser} from "../../services/auth.js";

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    },
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const SplitForm = (props) => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paying, setPaying] = useState(false);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        setPaying(true)
        setProcessing(true);
        const card = elements.getElement(CardNumberElement)
        await stripe.createSource(card, {
            type: 'card',
            owner: {name: 'unknown'},
            amount: amount * 100,
            currency: 'USD'
        }).then(res=>{
            const user = getUser();
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
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <label>
                Card number
                <CardNumberElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <label>
                Expiration date
                <CardExpiryElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <label>
                CVC
                <CardCvcElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <div>
                <label htmlFor="amount">{'Monto $'}</label>
                <input name={'amount'} type="number" placeholder={'Monto a donar'} value={amount}
                       onChange={(event) => setAmount(parseInt(event.target.value))}/>
            </div>

            <div>
                <label htmlFor="message">{'Mensaje'}</label>
                <textarea name={'message'}
                          className={'block border p-2 rounded-md w-full outline-theme-secondary'}
                          placeholder={'Escribe un mensaje'}
                          value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
            </div>

            <div className={'flex justify-center mt-10'}>
                <button className={'btn-prim'} type="submit" disabled={!stripe}>
                    Donar
                </button>
            </div>
        </form>
    );
};

export default SplitForm;
