import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'; //*импортировали новый объект контекста
import { CardsContext } from '../contexts/CardsContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState();

  const [currentUser, setCurrentUser] = React.useState({});
  const [initialCards, setCards] = React.useState([]);

  React.useEffect(() => { //*хук с побочным эффектом
    api.get('/users/me')
      .then((result) => { //*eсли запрос выполнен успешно, сработает обработчик then с описанием последующих действий
        setCurrentUser(result); //*result - это объект на сервере с информацией о пользователе
      }) //*получили с сервера информацию и передали её в соответствующую переменную состояния

      .catch((error) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', error);
      });

    api.get('/cards')
      .then((result) => { //*result - это полученный с сервера массив объектов с данными всех карточек
        setCards(result.slice(0, 6)); //*урезали result до шести карточек и записали этот массив в переменную состояния cards
      })

      .catch((error) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', error);
      });
  }, []); //*вторым аргументом функции передали зависимость с пустым массивом, чтобы эффект был вызван всего один раз, при монтировании компонента
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(owner => owner._id === currentUser._id); //*проверяем, есть ли уже лайк на этой карточке

    api.changeCardLikeStatus(card._id, isLiked)
      .then((newCard) => { //*отправили запрос в API на добавление или удаление лайка в зависимости от isLiked и получили обновлённые данные карточки
        const newCards = initialCards.map(item => item._id === card._id ? newCard : item); //*сформировали новый массив карточек на основе имеющегося, подставив в него новую карточку

        setCards(newCards); //*обновили переменную состояния и интерфейс изменился автоматически
      })

      .catch((error) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', error);
      });
  }

  function handleCardDelete(card) {
    api.delete(`/cards/${card._id}`)
      .then(() => {
        const newCards = initialCards.filter(item => item._id !== card._id ? true : false); //*сформировали новый массив карточек на основе имеющегося, исключив из него удалённую карточку

        setCards(newCards);
      })

      .catch((error) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', error);
      });
  }

  function handleUpdateUser(userInfo) {
    api.patch('/users/me', userInfo) //*обновили на сервере информацию о пользователе, полученную из формы
      .then((result) => { //*eсли запрос выполнен успешно, сработает обработчик then с описанием последующих действий
        setCurrentUser(result); //*result - это объект на сервере с информацией о пользователе

        closeAllPopups();
      }) //*получили обратно информацию с сервера и добавили её на страницу

      .catch((error) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', error);
      }); //*если что-то пошло не так, — например, отвалился интернет — сработает catch
  }

  function handleUpdateAvatar(avatarLink) {
    api.patch('/users/me/avatar', avatarLink) //*обновили на сервере ссылку на аватар, полученную из формы
      .then((result) => {
        setCurrentUser(result);

        closeAllPopups();
      })

      .catch((error) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', error);
      });
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.post('/cards', cardInfo) //*добавили на сервере информацию о новой карточке, полученную из формы
      .then((result) => { //*result - это возвращаемый с сервера объект, в котором хранится информация о новой карточке
        setCards([result, ...initialCards]);  //*обновили стейт intialCards с помощью, расширенной за счёт добавления новой карточки, копии текущего массива

        closeAllPopups();
      })

      .catch((error) => {
        alert('Ошибка. Запрос не выполнен.');
        console.log('Ошибка. Запрос не выполнен:', error);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setSelectedCard();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}> {/*с помощью провайдера контекста распространили значение пропса value по всему дереву дочерних компонентов*/} 
      <CardsContext.Provider value={initialCards}>        
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          cards={initialCards}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />       
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />       
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        /> 
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          id="card-delete-popup"
          title="Вы уверены?"
          btnText="Да"
          ariaLabel="Закрыть попап подтверждения удаления карточки."
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </CardsContext.Provider>   
    </CurrentUserContext.Provider>        
  );
}

export default App;
