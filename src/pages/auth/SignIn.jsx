import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {signIn} from "../../services/auth.js";
import {ops} from "../../utils/messages.js";

function SignIn(props) {
    const navigate=useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');

    function onSubmitHandler(event) {
        event.preventDefault();

        signIn(email,password).then(response=>{
            navigate('/');
        }).catch(err=>{
           setErrorMessage(ops);
        });
    }

    return (
        <div className={'grow flex justify-center items-center'}>
            <form className={'bg-white w-1/6 shadow-lg shadow-theme-primary rounded-md p-5'}  onSubmit={onSubmitHandler}>
                <div className={'flex justify-center mb-8'}>
                    <span className={'text-xl font-bold text-theme-primary uppercase'}>{'Iniciar sesión'}</span>
                </div>

                <div className={'mb-12 flex flex-col justify-center'}>
                <button type={'button'} className={'w-full flex justify-center gap-5 shadow-md hover:bg-gray-200 border-black'}>
                    <img src="https://www.pngplay.com/wp-content/uploads/12/Google-Transparent-Clip-Art-Image.png"
                         alt=""
                         className={'h-6 w-6'}/>
                    <span className={'font-medium'}>{'Iniciar con Google'}</span>
                </button>
                </div>

                <span className={'error'}>{errorMessage}</span>

                <div>
                    <label htmlFor={'email'}>{'Correo'}</label>
                    <input id={'email'} type="email" required value={email}
                           onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={'password'}>{'Contraseña'}</label>
                    <input id={'password'} type="password"  required value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div className={'flex justify-center mt-8'}>
                    <button className={'btn-prim'}>{'Acceder'}</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;