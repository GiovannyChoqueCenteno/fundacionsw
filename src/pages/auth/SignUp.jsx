import React from 'react';

function SignUp(props) {
    return (
        <div className={'grow flex justify-center items-center'}>
            <form className={'bg-white w-1/6 shadow-lg shadow-theme-primary rounded-md p-5'}>
                <div className={'flex justify-center mb-5 rounded-full'}>
                    <label className="flex flex-col justify-center items-center h-36 w-36 relative rounded-full">
                        <img className="object-cover h-full rounded-full"
                             src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJ6BhxOYzhnHeCsIhART7banl41jJg2dtEMNh9dzshgXGbTfvLli2-mplON7MKsD1F8c&usqp=CAU'}
                             alt={''}/>
                            <div className="flex flex-col justify-center items-center absolute">
                                <i className="uil uil-image-plus text-5xl"></i>
                            </div>
                            <input  type="file" className={'hidden'} accept={'image/*'}/>
                    </label>
                </div>
                <div>
                    <label htmlFor={'name'}>{'Nombre'}</label>
                    <input id={'name'} type="text"/>
                </div>
                <div>
                    <label htmlFor={'email'}>{'Correo'}</label>
                    <input id={'email'} type="email"/>
                </div>
                <div>
                    <label htmlFor={'telephone'}>{'Teléfono'}</label>
                    <input id={'telephone'} type="tel"/>
                </div>
                <div>
                    <label htmlFor={'ci'}>{'C.I.'}</label>
                    <input id={'ci'} type="text"/>
                </div>
                <div>
                    <label htmlFor={'password'}>{'Contraseña'}</label>
                    <input id={'password'} type="password"/>
                </div>
                <div>
                    <label htmlFor={'confirm-password'}>{'Confirmar contraseña'}</label>
                    <input id={'confirm-password'} type="password"/>
                </div>
                <div className={'flex justify-center mt-8'}>
                    <button className={'btn-prim'}>{'Registrarme'}</button>
                </div>
            </form>
        </div>
);
}

export default SignUp;