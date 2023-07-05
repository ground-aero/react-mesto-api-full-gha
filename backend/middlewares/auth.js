/** Мидлвэр авторизации. должен верифицировать токен из заголовков
 * Если с токеном всё в порядке, мидлвэр должен добавлять пейлоуд токена в объект запроса
 * и вызывать next: */
require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const AuthoErr = require('../errors/autho-err');
const { JWT_SECRET, NODE_ENV } = require('../config');
// const { JWT_SECRET, NODE_ENV } = process.env;

/** мидлвэр будет вызываться на каждый запрос.
 * проверять хедер определенных запросов на наличие авторизации */
const auth = (req, res, next) => {
// ToDo: check token valid, and go next. If (valid) {go next}, else error
  /** взять заголовок authorization */
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthoErr('Необходима авторизация *');
  }

  /** достать jwt из authorization хедера, удалить Bearer из загол */
  // const token = authorization.replace('Bearer ', '');
  const token = authorization.split('Bearer ')[1];
  let payload;

  try {
    payload = jsonwebtoken.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    /** проверить что jwt валидный с помощью библ jsonwebtoken */
  } catch (error) {
    throw new AuthoErr('передан неверный логин или пароль -');
  }

  req.user = payload; // добавить пейлоуд токена в объект запроса юзера !
  return next();
};

module.exports = auth;
