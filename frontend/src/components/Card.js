import React from 'react'
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    /** Контекст currentUser */
    const currentUser = React.useContext(CurrentUserContext)
    /** Определяем, являемся ли мы владельцем текущей карточки */
    const isOwn = card.owner._id === currentUser._id;
    /** Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    /** Создаём переменную, которую после зададим в `className` для кнопки лайка */
    const cardLikeButtonClassName = (
        `card__btn-like ${isLiked && 'card__btn-like_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        console.log('clicked heart')
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card)
        console.log('deleted card')
    }

    return (
        <li className="card">
            {isOwn && <button className="card__btn-del opacity-transition" onClick={handleDeleteClick} type="button"
                              aria-label="delete"/>}
            <img className="card__img" src={ card.link } alt={ card.name } onClick={handleClick}/>
            <div className="card__info-wrap">
                <h2 className="card__title">{ card.name }</h2>
                <div className="card__btn-like-wrap">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="like"></button>
                    <span className="card__btn-like-count">{ card.likes.length }</span>
                </div>
            </div>
        </li>

    )
}

export default Card