import React, {useState} from 'react';
import {dummyImage} from "../../utils/constants.js";
import {uploadImageProfile} from "../../services/storage.js";
import {createAccount} from "../../services/auth.js";
import {saveUser} from "../../services/firestore.js";
import {useNavigate} from "react-router-dom";

function SignUp(props) {
    const navigate=useNavigate();

    const [image, setImage] = useState(dummyImage)
    const [file, setFile] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [ci, setCi] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState('');

    function imageHandler(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setFile(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (_event) => {
                setImage(reader.result?.toString() || dummyImage);
            }
        }
    }

    async function onSubmitHandler(event) {
        event.preventDefault();
        if (password === confirmPassword) {
            let url = '';
            try {
                if (file) {
                    url = await uploadImageProfile(file);
                }

                const uid = await createAccount(email, password)

                await saveUser({
                    uid,
                    name,
                    email,
                    telephone,
                    ci,
                    url
                });

                navigate('/');
            } catch (err) {
                setErrorMessage("Oops! ocurrio un error, intentalo de nuevo");
            }
        } else {
            setErrorMessage('Las contraseñas no coinciden');
        }
    }

    return (
        <div className={'grow flex justify-center items-center'}>
            <form className={'bg-white w-1/6 shadow-lg shadow-theme-primary rounded-md p-5'} onSubmit={onSubmitHandler}>
                <div className={'flex justify-center mb-5 rounded-full'}>
                    <label className="flex flex-col justify-center items-center h-36 w-36 relative rounded-full">
                        <img className="object-cover h-full rounded-full"
                             src={image}
                             alt={''}/>
                        <input type="file" className={'hidden'} accept={'image/*'} onChange={imageHandler}/>
                    </label>
                </div>
                <div>
                    <span className={'error'}>{errorMessage}</span>
                </div>
                <div>
                    <label htmlFor={'name'}>{'Nombre'}</label>
                    <input id={'name'} type="text" required value={name}
                           onChange={(event) => setName(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={'email'}>{'Correo'}</label>
                    <input id={'email'} type="email" required value={email}
                           onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={'telephone'}>{'Teléfono'}</label>
                    <input id={'telephone'} type="tel" value={telephone}
                           onChange={(event) => setTelephone(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={'ci'}>{'C.I.'}</label>
                    <input id={'ci'} type="text" value={ci} onChange={(event) => setCi(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={'password'}>{'Contraseña'}</label>
                    <input id={'password'} type="password" required value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor={'confirm-password'}>{'Confirmar contraseña'}</label>
                    <input id={'confirm-password'} type="password" required value={confirmPassword}
                           onChange={(event) => setConfirmPassword(event.target.value)}/>
                </div>
                <div className={'flex justify-center mt-8'}>
                    <button className={'btn-prim'}>{'Registrarme'}</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;