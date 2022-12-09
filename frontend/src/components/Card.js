import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? "photo-grid__delete" : "photo-grid__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `photo-grid__like ${
    isLiked ? "photo-grid__like_active" : ""
  }`;

  return (
    <div className="photo-grid__item" key={card._id}>
      <img
        className="photo-grid__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={() => onCardDelete(card)}
      ></button>
      <div className="photo-grid__bar">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__like-box">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => onCardLike(card)}
          ></button>
          <p className="photo-grid__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
