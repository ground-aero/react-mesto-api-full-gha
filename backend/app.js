/** Осн. логика сервера, запуск и подключение к БД. */
require('dotenv').config(); // чтение env-переменных из .env-файла
const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
// const corsAllowed = require('./middlewares/cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const { errors } = require('celebrate');
const {
  ERR_CODE_404,
} = require('./errors/errors-codes');
const NotFoundErr = require('./errors/not-found-err');
// берем адрес БД из process.env
// const { PORT = 3000, DB_ADDRESS = 'mongodb://0.0.0.0:27017/mestodb' } = process.env;
// console.log(process.env.NODE_ENV); // production
const { MONGO_URL } = require('./config');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');
const errorsHandler = require('./middlewares/errors-handler');
const auth = require('./middlewares/auth');
const { loginValidator, createUserValidator } = require('./middlewares/validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const { PORT = 3001 } = process.env; // на этом порту будет прослушиватель Сервера
const app = express();

const corsOptions = {
  origin: ['https://mesto-react.tech', 'http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200, // для поддержки старых браузеров
  credentials: true, // если запросы содержат куки или авторизационные заголовки
};

app.use(cors(corsOptions));
// app.use(corsAllowed);
app.options('*', cors(corsOptions)); // обработка preflight запросов для всех маршрутов

/** подключаемся к серверу mongo */
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`подключились к БД: ${MONGO_URL} \n`))
  .catch((err) => console.log('Ошибка подключения к базе данных: ', err.message));

/** 2 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse application/x-www-form-urlencoded
// app.use(express.json());
app.use(helmet()); // защита от некоторых веб-уязвимостей
app.use(morgan('dev'));
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter); // Apply the rate limiting middleware to all requests

app.get('/crash-test', () => { // Краш-тест сервера
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
/** 3 Routes which handling requests
 * обработчики POST-запросов на роуты: '/signin' и '/signup'; */
app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginValidator, login);

/** все роуты, кроме /signin и /signup, защищены авторизацией */
app.use('/users', auth, usersRouter); // запросы в корень матчим с путями которые в руте юзеров
app.use('/cards', auth, cardsRouter);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
/** Любые маршруты не подходящие под созданные роуты, вызовут 404 статус */
app.use((req, res, next) => {
  next(new NotFoundErr(ERR_CODE_404));
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});
app.use(errorsHandler);

/** 4 */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
