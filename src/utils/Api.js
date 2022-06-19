//класс Api необходим для работы с API и выполнения запросов к серверу

//CLASS
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, options) {
    if (options.body) {
      options.body = JSON.stringify(options.body); 
    }  //*если в опциях будет body, добавить свойство с преобразованием объекта JSON в строку, для будущей передачи на сервер
    
    options.headers = this._headers;

    return fetch(this._baseUrl + url, options) //*метод fetch создаёт запрос на сервер и возвращает его ответ, вторым аргументом передали объект опций
      .then((res) => {
        if (res.ok) { //*если запрос прошёл успешно
          return res.json() //*асинхронный метод json читает ответ от сервера в формате json и возвращает промис, из которого можно достать нужные данные через обработчик then
        }  

        return Promise.reject(`${res.status}`); //*если сервер вернул ошибку, отклонили промис, чтобы перейти в блок catch
      });
  }
  
  get(url) {
    return this._fetch(url, {
      method: 'GET',   
    });
  } //*метод для получения данных с сервера

  patch(url, body) {
    return this._fetch(url, {
      method: 'PATCH',
      body //*при вызове метода в index.js вместо параметра body подставили объект с данными, которые требуется передать на сервер
    });
  } //*для частичного обновления ресурса. Например, при обновлении профиля пользователя

  post(url, body) {
    return this._fetch(url, {
      method: 'POST',
      body
    });
  } //*метод для для отправки данных на сервер
   
  delete(url) {
    return this._fetch(url, {
      method: 'DELETE',
    });
  } //*метод для удаления ресурса с сервера
 
  put(url) {
    return this._fetch(url, {
      method: 'PUT',
    });
  } //*метод для полного обновления указанного ресурса

  changeCardLikeStatus(cardId, isLiked) {
    return this._fetch(`/cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
    });
  }
}

//API INSTANCE
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'da3ea697-f11c-42f5-89fc-193a981f7278',
    'Content-Type': 'application/json'
  }
});

export default api;