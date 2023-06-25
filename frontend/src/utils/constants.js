export const selectors = {
  card: '.card',
  image: '.card__img',
  title: '.card__title',
  btnLike: '.card__btn-like',
  btnDel: '.card__btn-del',
  like: '.card__btn-like_active',
};
//КОНФИГИ ФОРМ
export const config = {
  formClass: '.popup__form',
  inputClass: '.popup__input',
  submitButtonClass: '.btn_submit',
  disabledButtonClass: 'btn_status_disabled', // button disabled style
  errorInputClass: 'popup__input-span_error_active', // <span> error
  errorLineClass: 'popup__input_line_error',
};

export const popupSelectorsImage = {
  popupClass: 'popup_img-bg',
  popupActiveClass: 'popup_opened',
};

// buttons
export const btnEditProfile = document.querySelector('.profile__btn-edit');
export const btnAddPlace = document.querySelector('.profile__btn-addplace'); // кнопка "+" / секции profile
export const btnEditAvatar = document.querySelector('.profile__avatar-edit-btn'); // "кнопка-cover" обновить автар

export const btnDeleteConfirm = document.querySelector('.btn_type_submit-delete');

// forms (430px)
export const formProfile = document.forms.profile;// по св-ву name
export const inputEditName = formProfile.elements.name; // по св-ву name // page.querySelector('#popup__input_type_edit-name');
export const inputEditJob = formProfile.elements.about; // // page.querySelector('#popup__input_type_job');

export const formAvatar = document.forms.avatar;// по св-ву name
export const inputEditAvatar = formAvatar.elements.linkavatar;

export const formPlace = document.forms.place