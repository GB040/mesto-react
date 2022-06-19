import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const nameInputRef = React.useRef(); //*записываем объект, возвращаемый хуком, в переменную, в которой окажется DOM-элемент с атрибутом ref
  const linkInputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: nameInputRef.current.value, //*получили значение инпута с помощью рефа и свойства value, передали его во внешний обработчик handleAddPlaceSubmit
      link: linkInputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      id="add-popup"
      title="Новое место"
      btnText="Создать"
      ariaLabel="Закрыть форму добавления нового места."
      children={
        <fieldset className="popup__fieldset">
          <input id="add-popup-input-name" name="name" className="popup__input-text" ref={nameInputRef} type="text" placeholder="Название" minLength="1" maxLength="30" required />
          <span id="add-popup-input-name-error" className="popup__input-error popup__input-error_hide"></span>
          <input id="add-popup-input-link" name="link" className="popup__input-text" ref={linkInputRef} type="url" placeholder="Ссылка на картинку" required />
          <span id="add-popup-input-link-error" className="popup__input-error popup__input-error_hide"></span>
        </fieldset>
      }
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default AddPlacePopup;