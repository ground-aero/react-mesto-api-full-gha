import React from 'react'
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    /** Стейт, в котором содержится значение инпута */
        // const [value, setValue] = React.useState('');
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    /** Обработчик изменения инпута обновляет стейт */
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();// Запрещаем браузеру переходить по адресу формы
        /** Передаём значения управляемых компонентов во внешний обработчик */
        onAddPlace({name, link});
    }

    /** После загрузки текущего пользователя из API
     /* Это компонент добавления карточки. Тут нужно очищать форму */
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]); /** тут нужно следить за isOpen, чтобы очищать инпуты при открытии попапа / сабмите формы */

    return (
        <PopupWithForm
            isOpen={ isOpen }
            onClose={ onClose }
            onSubmit={handleSubmit}
            title={'Новое место'}
            name={'place'}
            buttonText={ isLoading ? 'Сохранение...' : 'Создать' }
        >
          <span className="popup__input-field popup__input-field_wrap">
            <input
                value={name}
                onChange={handleChangeName}
                type="text"
                className="popup__input"
                id="place-input"
                name="name"
                placeholder="Название"
                tabIndex="1"
                minLength="2"
                maxLength="30"
                required
            />
            <span
                className="popup__input-span place-input-error"
                id="input-addplace-error"
            ></span>
          </span>
            <span className="popup__input-field popup__input-field_wrap">
            <input
                value={link}
                onChange={handleChangeLink}
                type="url"
                className="popup__input"
                id="link-input"
                name="link"
                placeholder="Ссылка на картинку"
                tabIndex="2"
                required
            />
            <span
                className="popup__input-span link-input-error"
                id="input-addplace_url-error"
            ></span>
          </span>
        </PopupWithForm>
    )
}

export default AddPlacePopup