[![Статус тестов](../../actions/workflows/tests.yml/badge.svg)](../../actions/workflows/tests.yml)

# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. 

Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`.

### - Requirements specification: [link](https://concrete-web-bad.notion.site/15-4a17355b76b54be8b71eabe0ec7645cc)
### - Check-List: [link](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_15.pdf)

---

## Адрес репозитория
https://github.com/ground-aero/react-mesto-api-full-gha

## Ссылки на проект:
IP-address 158.160.112.89

Frontend https://ga-mesto.nomoreparties.sbs

Backend https://api.ga-mesto.nomoreparties.sbs

Проект размещен на Яндекс.Облаке.

--
## Запуск:

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
#### ToDo:
- после успешного прохождения ревью удалить краш-тест сервера в app.js
