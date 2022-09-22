import React from 'react';

function SignIn(props) {
    return (
        <div className={'grow flex justify-center items-center'}>
            <form className={'bg-white w-1/6 shadow-lg shadow-theme-primary rounded-md p-5'}>
                <div className={'flex justify-center mb-8'}>
                    <span className={'text-xl font-bold text-theme-primary uppercase'}>{'Iniciar sesión'}</span>
                </div>
                <div className={'flex justify-center'}>

                </div>
                <div className={'mb-12 flex flex-col justify-center'}>
                <button type={'button'} className={'w-full flex justify-center gap-5 shadow-md hover:bg-gray-200 border-black'}>
                    <img src="https://www.pngplay.com/wp-content/uploads/12/Google-Transparent-Clip-Art-Image.png"
                         alt=""
                         className={'h-6 w-6'}/>
                    <span className={'font-medium'}>{'Iniciar con Google'}</span>
                </button>
                </div>

                <div>
                    <label htmlFor={'email'}>{'Correo'}</label>
                    <input id={'email'} type="email"/>
                </div>
                <div>
                    <label htmlFor={'password'}>{'Contraseña'}</label>
                    <input id={'password'} type="password"/>
                </div>
                <div className={'flex justify-center mt-8'}>
                    <button className={'btn-prim'}>{'Acceder'}</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;