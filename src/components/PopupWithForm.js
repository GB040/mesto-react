import React from 'react';

function PopupWithForm(props) {
  return (
    <div id={props.id} className={props.isOpen ? 'popup popup_opened' : 'popup popup_closed'}> {/*если пропс isOpen примет значние true - добавить класс отображения попапа, если false - скрыть*/}
      <form name={props.id.slice(0, props.id.indexOf('-'))} className="popup__form-container" onSubmit={props.onSubmit}>
        <h3 className="popup__form-title">{props.title}</h3>
        {props.children}
        <button className="popup__submit popup__submit_valid" type="submit">{props.btnText}</button>
        <button className="popup__close popup__close_type_form-popup" type="button" aria-label={props.ariaLabel} onClick={props.onClose}></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
