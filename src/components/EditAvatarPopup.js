import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef(); //*записываем объект, возвращаемый хуком, в переменную, в которой окажется DOM-элемент с атрибутом ref

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value, //*получили значение инпута с помощью рефа и свойства value, передали его во внешний обработчик handleUpdateAvatar
    });
  }

  return (
    <PopupWithForm
      id="avatar-popup"
      title="Обновить аватар"
      btnText="Сохранить"
      ariaLabel="Закрыть форму обновления аватара."
      children={
        <fieldset className="popup__fieldset">
          <input id="avatar-popup-input-link" name="link" className="popup__input-text" ref={inputRef} type="url" placeholder="Ссылка на новый аватар" required />
          <span id="avatar-popup-input-link-error" className="popup__input-error popup__input-error_hide"></span>
        </fieldset>
      }
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default EditAvatarPopup;