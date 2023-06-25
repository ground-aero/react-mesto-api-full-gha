import React from 'react';

function InfoTooltip ({ name, isOpen, onClose, message, iconTooltip }) {

    return (

        <div className={`popup popup_type_${ name } ${ isOpen && 'popup_opened'} `}>

            <span className="popup__container popup__container_tooltip">
                 <button
                     className="popup__close-img popup__btn-close opacity-transition"
                     onClick={ onClose } type="button"></button>
                <img className="popup__img popup__img_tooltip" src={ iconTooltip } alt={ message }/>
               <h3 className="popup__title popup__title_tooltip">{ message }</h3>

            </span>

        </div>


    )

}

export default InfoTooltip