import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) { 
  const currentUser = React.useContext(CurrentUserContext); //*подписались на контекст CurrentUserContext, в переменной currentUser окажется значения пропса value провайдера контекста из App.js

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="" />
          <button className="profile__avatar-button" type="button" aria-label="Обновить аватар."></button>
        </div>
       
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль." onClick={props.onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>       

        <button className="profile__add-button" type="button" aria-label="Добавить новое место." onClick={props.onAddPlace}></button>                
      </section>

      <section className="cards">
        <ul className="cards__list"> {/*правила React требуют задавать ключи при работе со списками, они нужны для корректной работы движка*/}
          {props.cards.map((card) => (
            (<Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />)
          ))}
        </ul> {/*осуществили рэндер начальных карточек с помощью цикла map и данных из массива cards*/}      
      </section>
    </main>
  );
}

export default Main;
