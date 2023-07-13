import React from 'react';

/** @props card = selectedCard */
function ImagePopup({card, name, onImageClick, onClose}) {

    return (
        <div className={`popup popup_img-bg popup_type_${ name } ${ card.link && 'popup_opened'}`} id="overlay_img-zoom">
            <div className="popup__container-img popup__container-img_type_zoomer">
                <button
                    className="popup__close-img popup__btn-close opacity-transition opacity-transition_type_middle"
                    onClick={ onClose } type="button"></button>
                <img className="popup__img" src={ card.link } onClick={ onImageClick }
                     alt={`на изображении: ${ card.name }`}/>
                <h3 className="popup__subtitle">{ card.name }</h3>
            </div>
        </div>
    )
}

export default ImagePopup