import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext); 

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); //*после загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault(); //*запретили браузеру переходить по адресу формы

    props.onUpdateUser({
      name: name,
      about: description,
    }); //*передали значения управляемых компонентов во внешний обработчик handleUpdateUser, который находится App.js
  }

  return (
    <PopupWithForm
      id="edit-popup"
      title="Редактировать профиль"
      btnText="Сохранить"
      ariaLabel="Закрыть форму редактирования профиля."
      children={
        <fieldset className="popup__fieldset">
          <input id="edit-popup-input-name" name="name" className="popup__input-text" type="text" defaultValue={name} onChange={handleNameChange} placeholder="Имя" minLength="2" maxLength="40" pattern="^[А-Яа-яЁёa-zA-Z\s\-]+$" required />
          <span id="edit-popup-input-name-error" className="popup__input-error popup__input-error_hide"></span>
          <input id="edit-popup-input-about" name="about" className="popup__input-text" type="text" defaultValue={description} onChange={handleDescriptionChange} placeholder="О себе" minLength="2" maxLength="400" required />
          <span id="edit-popup-input-about-error" className="popup__input-error popup__input-error_hide"></span>
        </fieldset>
      }
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />  
  );
}

export default EditProfilePopup;