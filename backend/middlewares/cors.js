// // Массив разешённых доменов
// const allowedUrl = [
//   'https://praktikum.tk',
//   'http://praktikum.tk',
//  'http://api.ga-mesto.nomoreparties.sbs',
//  'https://api.ga-mesto.nomoreparties.sbs',
//   'localhost:3001',
//   'http://localhost:3001',
//   'http://127.0.0.1:3001',
// ];
//
//  module.exports = (req, res, next) => {
//   const { origin } = req.headers; // Записываем в переменную origin (источник запроса)
//   // соответствующий заголовок
//
//   if (allowedUrl.includes(origin)) { // Проверяем, что значение origin есть среди
//   // разрешённых доменов
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }
//
//    const { method } = req;
//    const requestHeaders = req.headers['access-control-request-headers'];
//    const DEFAULT_METHODS_ALLOWED = 'GET, POST, PUT, HEAD, PATCH, DELETE';
//
//    if (method === 'OPTIONS') {
//      res.header('Access-Control-Allow-Methods', DEFAULT_METHODS_ALLOWED);
//      res.header('Access-Control-Allow-Headers', requestHeaders);
//      return res.end();
//    }
//
//   next();
// };
