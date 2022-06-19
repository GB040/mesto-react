import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) { 
  const currentUser = React.useContext(CurrentUserContext); //*подписались на контекст CurrentUserContext, в переменной currentUser окажется значения пропса value провайдера контекста из App.js

  const isOwn = props.card.owner._id === currentUser._id; //*определяем, являемся ли мы владельцем текущей карточки
  const cardDeleteButtonClassName = (
    `card__trash ${isOwn ? 'card__trash_show' : 'card__trash_hide'}`
  ); //*если мы являемся владельцем - показать кнопку удаления карточки

  const isLiked = props.card.likes.some(item => item._id === currentUser._id); //*определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = (
    `card__like ${isLiked ? 'card__like_active' : 'card__like_inactive'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      <img className="card__photo" src={props.card.link} alt={props.card.name + '.'} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить место." onClick={handleDeleteClick}></button>
      <div className="card__container">
        <h2 className="card__title">{props.card.name}</h2>
        <button className={cardLikeButtonClassName} type="button" aria-label="Лайкнуть место." onClick={handleLikeClick}></button>
      </div>
      <p className="card__like-quantity">{props.card.likes.length}</p>
    </li> 
  );
}

export default Card;