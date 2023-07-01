/** класс не связан с пользовательским интерфейсом, а полностью занят отправкой запросов на сервер и получением от них ответа. */
/** @param options - опции для работы с API (serverURL - url сервера, headers - заголовки в виде объекта) */
export class Api {
    constructor(options) {
        this._headers = options.headers;
        this._serverUrl = options.serverUrl;
        // this._apiConfig = apiConfig;
    }

    _onResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
    }

    _request(url, options) {
        return fetch(url, options).then(this._onResponse)
    }

    getAllInfo() { //метод ожидает массив промисов - Promise1, Promise2 ...
        return Promise.all([this.getUser(), this.getAllCards()])//вернет Promise
    }

    /** получить данные пользователя (GET) */
    getUser() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._serverUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

    /** изменить данные пользователя (PATCH) */
    patchUser(formValue) {
        // console.log(formValue)
        const token = localStorage.getItem('jwt')
        return fetch(`${this._serverUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                name: formValue.name,
                about: formValue.about,
            })
        }).then(res => this._onResponse(res))
    }

    /** заменить аватар (PATCH) */
    patchAvatar(formDataObject) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._serverUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(formDataObject)// avatar: formValue.avatar,
        }).then(res => this._onResponse(res))
    }

    getAllCards() {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._serverUrl}/cards/`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
            },
            // headers: this._headers,
        }).then(res => this._onResponse(res))
    }

    addNewCard({ name, link }) {
        const token = localStorage.getItem('jwt')
        return fetch(`${this._serverUrl}/cards/`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name, link }),
        }).then(res => this._onResponse(res))
    }

    deleteCard(cardId) {
        // console.log(`${this._apiConfig.serverUrl}/cards/${id}`)
        const token = localStorage.getItem('jwt')
        return fetch(`${this._serverUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then(res => this._onResponse(res))
    }

/** ставит/удаляет лайк
/* @param cardLiked - boolean, если лайк есть, удаление, нет - установка. /* @param cardID - ID карточки
/* @returns {Promise<Response>} - объект карточки/ текст ошибки */
    changeLikeCardStatus(cardId, isLiked) {
console.log(isLiked)
    const token = localStorage.getItem('jwt')
        return fetch(`${this._serverUrl}/cards/likes/${cardId}`, {
            method: isLiked?"DELETE":"PUT",
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        }).then(res => this._onResponse(res))
    }

}

export const apiConfig = {
    // serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
    serverUrl: 'http://localhost:3001',
    headers: {
        // "Authorization": "428b584a-5472-4fac-aca2-5c3d80bec64e"
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'content-type': 'application/json',
    }
}
const api = new Api(apiConfig)
// const api = new Api({
//     serverUrl: 'http://localhost:3001',
// });

export default api
