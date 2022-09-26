import React from 'react'

const Modal = (props) => {

    const { children, modalId, title, openModalText, contentStyle, btnStyle } = props;

    return (
        <div className={contentStyle}>
            <a href={`#${modalId}`} className={`no-underline btn-custom rounded-md ${btnStyle}`}>{openModalText}</a>
            <div className="modal" id={modalId}>
                <div className="modal-box text-start">
                    <a href="#" className="px-2 text-white rounded-md bg-theme-primary absolute right-2 top-2">✕</a>
                    <h1 className='font-bold'>{title}</h1>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal