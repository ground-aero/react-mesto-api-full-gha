import React from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, onSubmit }) {
    // console.log(children)

    return (

        <div className={`popup popup_type_${ name } ${ isOpen ? 'popup_opened' : '' }`}>
            <div className="popup__container">
                <button className="popup__btn-close opacity-transition" onClick={ onClose } type="button"
                        aria-label="close"></button>
                <form onSubmit={onSubmit} className="popup__form" name={ name } >
                    <h2 className="popup__title">{ title }</h2>
                    { children }
                    <button type="submit"
                            className="btn btn_submit opacity-transition">{ buttonText }
                    </button>
                </form>
            </div>
        </div>

    )
}

export default PopupWithForm