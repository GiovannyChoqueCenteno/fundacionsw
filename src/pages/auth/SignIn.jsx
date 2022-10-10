import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/auth.js";
import { ops } from "../../utils/messages.js";
import jwt_decode from "jwt-decode";
import { routes } from '../../utils/constants.js';

function SignIn(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "266177157513-ecmdle9q8ka666bvd11au5js3autvto2.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        })

        google.accounts.id.renderButton(
            document.getElementById("buttonSignInGoogle"),
            { theme: "outline", size: "large" }
        )
        google.accounts.id.prompt()
    }, []);

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID Token: " + response.credential)
        var userObject = jwt_decode(response.credential)
        console.log(userObject)
        sessionStorage.setItem("auth", JSON.stringify({
            "tokenJWT":response.credential,
            "userData":userObject,
            "authType":"Google",
        }));
        userObject != null ? navigate(routes.home) : navigate(routes.signIn);
    }

    function handleSignOut(event) {

    }

    function onSubmitHandler(event) {
        event.preventDefault();

        signIn(email, password).then(response => {
            navigate('/client');
        }).catch(err => {
            setErrorMessage(ops);
        });
    }

    return (
        <div className={'grow flex justify-center items-center'}>
            <form className={'bg-white w-1/6 shadow-lg shadow-theme-primary rounded-md p-5'} onSubmit={onSubmitHandler}>
                <div className={'flex justify-center mb-8'}>
                    <span className={'text-xl font-bold text-theme-primary uppercase'}>{'Iniciar sesión'}</span>
                </div>
                <div id='buttonSignInGoogle'></div>
                <span className={'error'}>{errorMessage}</span>

                <div>
                    <label htmlFor={'email'}>{'Correo'}</label>
                    <input id={'email'} type="email" required value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label htmlFor={'password'}>{'Contraseña'}</label>
                    <input id={'password'} type="password" required value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className={'flex justify-center mt-8'}>
                    <button className={'btn-prim'}>{'Acceder'}</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;