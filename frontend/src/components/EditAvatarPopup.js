import React from 'react'
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    /** записываем объект, возвращаемый хуком, в переменную */
    const inputAvatarRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputAvatarRef.current.value /** Значение инпута, полученное с помощью рефа */,
        });
    }

    return (
        <PopupWithForm
            isOpen={ isOpen }
            onClose={ onClose }
            onSubmit={handleSubmit}
            title={'Заменить аватар'}
            name={'edit-avatar'}
            buttonText={ isLoading ? 'Сохранение...' : 'Сохранить' }
        >
          <span className="popup__input-field popup__input-field_wrap">
            <input
                ref={inputAvatarRef}
                type="url"
                className="popup__input"
                id="avatar-input"
                name="linkavatar"
                placeholder="Ссылка на картинку"
                required
            />
            <span
                className="popup__input-span avatar-input-error"
                id="input-edit-avatar-error"
            ></span>
          </span>
        </PopupWithForm>
    )

}

export default EditAvatarPopup