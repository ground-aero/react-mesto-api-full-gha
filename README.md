[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. 

Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.

## Адрес репозитория. Ссылки на проект:

IP-address 158.160.112.89

Frontend https://ga-mesto.nomoreparties.sbs

Backend https://api.ga-mesto.nomoreparties.sbs

Проект размещен на Яндекс.Облаке.

--
## Запуск:

1. В корне проекта создайте файл `.env`, с содержанием типа:
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
