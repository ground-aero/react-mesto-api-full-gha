import React from 'react';
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
                  onEditAvatar,
                  onEditProfile,
                  onAddPlace,
                  onCardClick,
                  onCardLike,
                  onCardDelete,
                  cards,
                  children
              }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">

            <section id="profile" className="profile content__section">
        <span className="profile__avatar-edit-btn" onClick={onEditAvatar}>
          <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="бюст улыбающегося человека в красной шапке"
          />
        </span>
                <div className="profile__elements-wrap">
                    <div className="profile__name-wrap">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="btn profile__btn-edit opacity-transition"
                            type="button"
                            onClick={onEditProfile}
                            aria-label="edit"
                        />
                    </div>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                    className="btn profile__btn-addplace opacity-transition"
                    type="button"
                    onClick={onAddPlace}
                    aria-label="add"
                ></button>
            </section>

            <section className="elements content__section">
                <ul className="elements__list">
                    {cards.map((card, ind) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                            />
                        );
                    })}
                </ul>
            </section>

        </main>
    );
}

export default Main