# Учебный проект "Место"
`Mesto` - сервис для обмена фотографиями. Пользователи сервиса могут добавлять, удалять фото, ставить лайки понравившимся фотографиям. Формы добавления карточек, редактирования информации о пользователе и редактирования аватара валидируются при заполнении данных. Все всплывающие окна закрываются по нажатию кнопок: закрытия, нажатию на оверлей, и на кнопку Esc. 

Для использования приложения нужна регистрация по адресу электронной почты и паролю. Можно указать любую почту, даже не существующую. Подтвержения регистрации не отсылаются. Зарегистрировать (дублировать) аккаунт на уже зарегистрированный email нельзя.

--

Репозиторий данного приложения включает в себя фронтенд (в директории `frontend/`) и бэкенд (в директории `backend/`) со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.

#### *Requirements specification:* [link](https://concrete-web-bad.notion.site/15-4a17355b76b54be8b71eabe0ec7645cc)
#### *Check-List:* [link](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_15.pdf)

---

#### *Ссылки на проект:*
Server IP-address: 94.250.252.119

Frontend https://mesto-react.tech/

Backend https://api.mesto-react.tech/

#### Проект размещен на Облаке firstVDS.

##### *Адрес репозитория*
https://github.com/ground-aero/react-mesto-api-full-gha

--

#### *Использованы:*
1. Браузерные стили сброшены через Normalize.css;
2. Семантическая верстка;
3. Адаптивная верстка;
4. Библиотека ReactJS;
5. Роутинг страниц с помощью react-router;
6. Создано на основе шаблона Create React App;
7. Шрифты в форматах woff и woff2;

#### *Запуск:*

1. Создайте на сервере `.env`-файл, с основными переменными окружения:
```dotenv
NODE_ENV=production
JWT_SECRET_KEY=some-secret-key
BD_CONNECT_URL=mongodb://localhost:27017/bd

где:
JWT_SECRET_KEY - секр. ключ для генерации токена
BD_CONNECT_URL - строка подкл. к БД MongoDB
```

2. Выполните `npm run dev` или `npm run start` для запуска сервера;
3. Проект запустится на локальном сервере по адресу `http://localhost:3001`;

---
#### *ToDo:*
- удалить краш-тест сервера в app.js
[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)
