/** описание основных роутов для @/users/ (пользователя) */
const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfileInfo,
  updateAvatar,
} = require('../controllers/users');
const { userIdValidator, updateProfileValidator, updateAvatarValidator } = require('../middlewares/validator');

router.get('/', getUsers); // возвр. всех польз-лей. 2-й арг.- ф-ция контроллер
router.get('/me', getCurrentUser);
// в '/me' итак передается authorization header, поэтому не нужно 2-й раз его защищать

router.get('/:userId', userIdValidator, getUserById); // возвр польз-ля по _id.
router.patch('/me', updateProfileValidator, updateProfileInfo);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);

/** сущность внутри данного файла отвечает только за юзера (!) */
module.exports = router;
