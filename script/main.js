'use strict';

// Переменные
const modalAdd = document.querySelector ('.modal__add'),
modalItem = document.querySelector('.modal__item'),
addAd = document.querySelector('.add__ad'),
modalBtnSubmit = document.querySelector('.modal__btn-submit'),
modalSubmit = document.querySelector('.modal__submit');

// Функции
const toggleModal = item => {
    item.classList.toggle('hide');
};

// Обработка событий
addAd.addEventListener('click', () => {
    toggleModal(modalAdd);
    modalBtnSubmit.disabled = true;
});
modalAdd.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('modal__close') || target === modalAdd) {
        toggleModal(modalAdd);
        modalSubmit.reset();
    }
});

document.addEventListener('click', event => {
    const target = event.target;
    if (target.closest('.card')) {
        toggleModal(modalItem);
    }
});

modalItem.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('modal__close') || target === modalItem) {
        toggleModal(modalItem);
    }
});

document.addEventListener('keydown', event => {
    const key = event.code;
    if (key === 'Escape') {
        modalItem.classList.add('hide');
        modalAdd.classList.add('hide');
    }
})