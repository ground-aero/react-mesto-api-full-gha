/** описание основных роутов для карточки. */
const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');
const { cardValidator, cardIdValidator } = require('../middlewares/validator');

/** 'cards' удалили, роут теперь работает относительно урла, а не всего приложения */
router.get('/', getCards); // возвр. все карточки. 2-й арг. это ф-ция контроллер. получ карточки
router.use(auth); /** 7. Защита авторизацией всех остальных роутов */
router.post('/', cardValidator, createCard); // в req на созд карточки перед JSON с: name, link
router.delete('/:cardId', cardIdValidator, deleteCard); // Контроль прав.Нельзя уд. карт др.польз
router.put('/:cardId/likes', cardIdValidator, likeCard); // поставить лайк карточке
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
