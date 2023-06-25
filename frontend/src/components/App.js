import React, {useEffect} from 'react';

import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';// HOC

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import successIcon from '../images/tooltip_success.png';
import unsucessIcon from '../images/tooltip_unsuccess.svg'

import {Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import * as auth from "../utils/auth";
import {NoMatch} from "./NoMatch";


/**
 * @returns {JSX.Element}
 */
function App() {
    /** Функция принимает два аргумента: 1 — строка или число. 2 - объект с двумя полями:replace и state. */
    const navigate = useNavigate();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    /** Состояние выбранной для просмотра карточки */
    const [selectedCard, setSelectedCard] = React.useState({});
    /** Состояние текущего пользователя */
    const [currentUser, setCurrentUser] = React.useState({
        name: '',
        about: '',
    });
    /** Состояние массива карточек */
    const [cards, setCards] = React.useState([]);
    /** Состояние выбранной для удаления карточки */
    const [deleteCard, setDeleteCard] = React.useState({_id: ""});
    /** стейт-перемення loggedIn. Содержит статус пользователя — вошёл в систему или нет */
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [isSuccessTooltipOpen, setIsSuccessTooltipOpen] = React.useState(false);
    const [isUnsuccessTooltipOpen, setIsUnsuccessTooltipOpen] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false)/** переменная для отслеживания состояния загрузки во время ожидания ответа от сервера */

    /** Открывает всплывающее редактирование аватара */
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
        // return document.querySelector('#overlay_avatar').classList.add('popup_opened')
    }
    /** Открывает всплывающее редактирование профиля */
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    /** Открывает всплывающее добавление карточки */
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleImageClick() {
        setIsImagePopupOpen(true);
    }

    /** добавляем обработчик Escape:
     * 1. переменная isOpen снаружи useEffect, в ней следим за всеми состояниями попапов. * Если хоть одно состояние true или не null, то какой-то попап открыт */
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || isSuccessTooltipOpen || isUnsuccessTooltipOpen
    /** значит, навешивать нужно обработчик. */
    /** Объявляем функцию внутри useEffect, чтобы она не теряла свою ссылку при обновлении компонента. */
    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups()
            }
        }

        if (isOpen) {
            /** Как только он становится true, то навешивается обработчик, когда в false, тогда удаляется обработчик. */
            document.addEventListener('keydown', closeByEscape)
            return () => {//удаляем обработчик в clean up функции через return
                document.removeEventListener('keydown', closeByEscape)
            }
        }
    }, [isOpen])

    /** массив зависимостей c isOpen, чтобы отслеживать изменение этого показателя открытости */

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsSuccessTooltipOpen(false)/** закрытие Всплывашки "Успех регистрации" */
        setIsUnsuccessTooltipOpen(false)/** закрытие Всплывашки "Ошибка регистрации" */
    }

    /** Устанавливает выбранную карточку по нажатию
     * @param card */
    function handleCardClick(card) {
        setSelectedCard(card);
        // setIsImagePopupOpen(true)
    }

    /** ставит/удаляет лайки, @param card - объект карточки */
    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id); // Снова проверяем, есть ли уже лайк на этой карточке
        api
            .changeLikeCardStatus(card._id, isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(`err данных при лайке: ${err}`);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                /** создать копию массива, исключив из него удалённую карточку. */
                setCards((cards) => cards.filter(del => del !== card))
            })
            .catch((err) => {
                console.log(`err данных при удалении карточки: ${err}`);
            });
    }

    function handleUpdateUser(name, about) {
        setIsLoading(true)/** состоянипе для управления текстом кнопки сабмита в каждом попапе: 'Сохранение...' */

        api.patchUser(name, about)
            .then((userData) => {
                setCurrentUser(userData)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`err при загрузке данных юзера: ${err}`);
            })
            .finally(() => {
                setIsLoading(false)/** управяем состоянием/текстом кнопки сабмита в попапе */
            })
    }

    function handleUpdateAvatar(link) {
        setIsLoading(true)/** состоянипе для управления текстом кнопки сабмита в каждом попапе: 'Сохранение...' */

        api.patchAvatar(link)
            .then((result) => {
                setCurrentUser(result)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`err при загрузке данных аватара: ${err}`);
            })
            .finally(() => {
                setIsLoading(false)/** управяем состоянием/текстом кнопки сабмита в попапе */
            })
    }

    function handleAddPlaceSubmit(name, link) {
        setIsLoading(true)/** состоянипе для управления текстом кнопки сабмита в каждом попапе: 'Сохранение...' */

        api.addNewCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`err при отправке нов карточки на сервер: ${err}`);
            })
            .finally(() => {
                setIsLoading(false)/** управяем состоянием/текстом кнопки сабмита в попапе */
            })
    }

    function handleRegister(password, email) {/** @endpoint : /signin - обработчик регистрации.*/
        return auth.register(password, email)
            .then((res) => {
                console.log(res)
                /** {data: {email: "asadfs@dfg.com", _id: "63ee5a01d4567c00131e70f7" }}
                 При успешной регистрации второй обработчик then вернёт токен JWT */
                setIsSuccessTooltipOpen(true)
                navigate('/sign-in', {replace: true});
                // localStorage.setItem('token', data.token)
            })
            .catch((err) => {
                setIsUnsuccessTooltipOpen(true)
                console.log(`ошибка регистрации: ${err}`)
            })
    }

    function handleLogin(password, email) {/** @end-point: '/signin' */
        if (!password || !email) {
            return;
        }
        return auth.authorize(password, email)
            .then((data) => {
                console.log(data)/** выдает токен: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfa'} */
                if (data) {
                    setLoggedIn(true)
                    localStorage.setItem('token', data.token)
                    setEmail(email)
                    navigate('/', {replace: true});
                }
                // localStorage.setItem('token', data.token);/** сохраняем токен */
            })
            .catch((err) => {
                setIsUnsuccessTooltipOpen(true)
                console.log(`ошибка при логине ${err}`)/** коды: 400 - не передано одно из полей;  401 - пользователь с email не найден  */
            })
    }

    function onLogout() {/** Выход из приложения. Удаляем токен */
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/sign-in', {replace: true})
    }

    function handleTokenCheck() {
        /** @endpoint: '/users/me' */
        const jwt = localStorage.getItem('token')
        if (jwt) {/** есть ли jwt токен в локальном хранилище браузера ? */
            auth.checkToken(jwt)
                .then((res) => {
                    console.log(res)
                    if (res) {
                        setLoggedIn(true)
                        setEmail(res.data.email)
                        navigate('/', {replace: true}) /** автологин. Чтобы после перезагрузки не выкидывало снова в логин*/
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        handleTokenCheck()
    }, []);

    useEffect(() => {
        if (loggedIn) {
            navigate('/')
            Promise.all([api.getUser(), api.getAllCards()])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData);
                    setCards(cardsData);
                })
                .catch((err) => {
                    console.log(`Ошибка данных при загрузке аватара или карточек: ${err}`);
                })
        } else {
            navigate('/sign-up')
        }
    }, [loggedIn]);


    return (
        <div className="page__container">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    loggedIn={loggedIn}
                    email={email}
                    onLogout={onLogout}
                />

                <Routes>
                    {/* переадресация незалогиненного пользоватея на './sign-in' */}
                    {/*<Route exact path="/" element={loggedIn ? <Navigate to="/index" /> : <Navigate to="/sign-in" />} />*/}
                    <Route
                        exact path="/"
                        element={
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                element={Main}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}

                                cards={cards}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike} //лайк/дизлайк
                                onCardDelete={handleCardDelete}
                            />}
                    />

                    <Route path='/sign-up' element={<Register handleRegister={handleRegister}/>}/>
                    <Route path='/sign-in' element={<Login handleLogin={handleLogin}/>}/>
                    {/* переадресация -> page not found!*/}
                    <Route path="*" element={<NoMatch/>}/>

                </Routes>

                <Footer/>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />

                <PopupWithForm/>

                <ImagePopup
                    onImageClick={handleImageClick}
                    card={selectedCard}
                    onClose={closeAllPopups}
                    name={'zoom'}
                />

                <InfoTooltip /** Всплывашка: Регистрация успешна */
                    name='tooltip-success'
                    isOpen={isSuccessTooltipOpen}
                    onClose={closeAllPopups}
                    message='Вы успешно зарегистрировались!'
                    iconTooltip={successIcon}
                />
                <InfoTooltip /** Всплывашка: Ошибка регистрации... */
                    name='tooltip-unsuccess'
                    isOpen={isUnsuccessTooltipOpen}
                    onClose={closeAllPopups}
                    message='Что-то пошло не так! Попробуйте еще раз.'
                    iconTooltip={unsucessIcon}
                />

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
