import React from 'react';

function ImagePopup(props) {
  let openedPopupClass;
  let cardLink;
  let cardName;

  if (props.card) {
    openedPopupClass = 'popup_opened';
    cardLink = props.card.link;
    cardName = props.card.name;
  }

  return (
    <div id="photo-popup" className={`popup popup_closed ${openedPopupClass}`}>
      <div className="photo-popup__container">
        <img className="photo-popup__photo" src={cardLink} alt={cardName + '.'} />
        <h2 className="photo-popup__title">{cardName}</h2>
        <button className="popup__close photo-popup__close" type="button" aria-label="Закрыть окно с фотографией." onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
