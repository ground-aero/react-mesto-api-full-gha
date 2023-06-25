import React from 'react'
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
    console.log(isLoading)

    /** Стейт, в котором содержится значение инпута */
    // const [value, setValue] = React.useState('');
    const [name, setName] = React.useState('')
    const [about, setAbout] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    /** Обработчик изменения инпута обновляет стейт */
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();// Запрещаем браузеру переходить по адресу формы
        /** Передаём значения управляемых компонентов во внешний обработчик */
        onUpdateUser({
            name,
            about
        });
    }

    /** После загрузки текущего пользователя из API
     /* его данные будут использованы в управляемых компонентах. */
    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]); /** следим за isOpen(состоянием открытости), чтобы вставленные в инпуты данные пользователя сохранялись при следующем открытии попапа */

    return (
        <PopupWithForm
            isOpen={ isOpen }
            onClose={ onClose }
            onSubmit={handleSubmit}
            title={'Редактировать профиль'}
            name={'profile'}
            buttonText={ isLoading ? 'Сохранение...' : 'Сохранить' }
        >
          <span className="popup__input-field popup__input-field_wrap">
            <input
                /** Значение элемента «привязывается» к значению стейта */
                value={name}
                onChange={handleChangeName}
                type="text"
                className="popup__input"
                id="name-input"
                name="name"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                required
            />
            <span
                className="popup__input-span name-input-error"
                id="input-edit-error"
            ></span>
          </span>
            <span className="popup__input-field popup__input-field_wrap">
            <input
                value={about}
                onChange={handleChangeAbout}
                type="text"
                className="popup__input"
                id="job-input"
                name="about"
                placeholder="О себе"
                tabIndex="2"
                minLength="2"
                maxLength="200"
                required
            />
            <span
                className="popup__input-span job-input-error"
                id="input-edit_minimum-error"
            ></span>
          </span>
        </PopupWithForm>
    )

}

export default EditProfilePopup