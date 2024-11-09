//import { initialCards } from './cards.js'

const popup = document.querySelector('.popup'); //все попапы
const profileFormElement = document.querySelector('.popup__form-profile');
const cardFormElement = document.querySelector('.popup__form-card')

const profilePopup = document.querySelector('.popup_type_edit'); //попап для редактирования профиля
const cardPopup = document.querySelector('.popup_type_new-card'); //попап для карточек
const imagePopup = document.querySelector('.popup_type_image'); //попа с картинкой 

const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля
const profileAddButton = document.querySelector('.profile__add-button'); //кнопка добавления карточек

const popupClose = document.querySelectorAll('.popup__close'); //крестик закрытия попапа

const profileTitle = document.querySelector('.profile__title'); //имя профиля
const profileDescription = document.querySelector('.profile__description'); //описание профиля

const popupImage = document.querySelector('.popup__image'); //попап для показа картинки
const popupCaption = document.querySelector('.popup__caption'); //текст для попапа с картинкой

let inputName = document.querySelector('.popup__input_type_name'); //поле ввода для имени в профиле
let inputDescription = document.querySelector('.popup__input_type_description'); //поле ввода для описания в профиле

let inputNameCard = document.querySelector('.popup__input_type_card-name'); //поле ввода названия карточки
let inputLinkCard = document.querySelector('.popup__input_type_url'); //поле ввода ссылки карточки

const cardTemplate = document.querySelector('#card-template').content; //переменная с темплейтом
const placesList = document.querySelector('.places__list');  //переменная куда добавлять темлейт

//функция добавления стилей для плавно открытия и закрытия попапов
function addAnimationToPopups() {
    profilePopup.classList.add('popup_is-animated');
    cardPopup.classList.add('popup_is-animated');
    imagePopup.classList.add('popup_is-animated');
}

addAnimationToPopups();

//функция открытия попапа
function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

//функция закрытия попапа
function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}

//обработчик клика для открытия попапа редактирования профиля
profileEditButton.addEventListener('click', function() {
    openModal(profilePopup);
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
} );

//обработчик клика для открытия попапа редактирования карточек
profileAddButton.addEventListener('click', function() {
    openModal(cardPopup);
    
} );

//обработчик клика для озакрытия попапа при нажатие на кретстик
popupClose.forEach(function(closeButton) {
    closeButton.addEventListener('click', function() {
        closeModal(profilePopup);
        closeModal(cardPopup);
        closeModal(imagePopup);
    });
});

//функция сохранения данные для профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//функция сохранения данные для карточек
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    const card = createCard(inputNameCard.value , inputLinkCard.value);
    placesList.prepend(card);

    closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);


//функция создания карточек
function createCard(name, link){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = link; 
    cardImage.alt = name; 
    cardTitle.textContent = name; 

    cardElement.querySelector('.card__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    })

    cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt) {
        evt.target.closest('.card').remove();
    })

    cardImage.addEventListener('click', function(evt) {
        popupImage.src = link;
        popupImage.alt = link;
        popupCaption.textContent = name;

        openModal(imagePopup);
    })

    return cardElement;
}

//метод создания карточек из массива
initialCards.forEach(cardData => {
    const card = createCard(cardData.name, cardData.link);
    placesList.append(card); // Добавляем карточку в список
});