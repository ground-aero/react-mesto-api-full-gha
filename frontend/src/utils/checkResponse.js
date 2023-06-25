// /** Объект с ошибками сервера * { {"400": string, "401": string} } */
// const SERVER_ERROR = {
//     400: "Одно из полей не заполнено или не прошло валидацию",
//     401: "Пользователь с введенным email не найден"
// }
//
// const handleRes = (res) => {
//     if (res.status === 400 || res.status === 401) {
//         throw new Error(SERVER_ERROR[res.status]);
//     } else {
//         return res.json();
//     }
// };

export function checkResponse(res) {
    // проверка ответа
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}
