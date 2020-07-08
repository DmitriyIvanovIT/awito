'use strict';

const dataBase = [];

// Переменные
const modalAdd = document.querySelector ('.modal__add'),
modalItem = document.querySelector('.modal__item'),
addAd = document.querySelector('.add__ad'),
modalBtnSubmit = document.querySelector('.modal__btn-submit'),
modalSubmit = document.querySelector('.modal__submit'),
catalog = document.querySelector('.catalog'),
modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements]
.filter(elem => elem.tagName !== 'BUTTON');


// Функции
const closeModal = event => {
    const target = event.target;
    if (target.classList.contains('modal__close') || target === modalAdd || target === modalItem 
    || event.key === 'Escape' || target === modalBtnSubmit) {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
        modalBtnWarning.style.display = '';
    };
    document.body.removeEventListener('keydown', closeModal); 
    console.log(dataBase);
},
openModal = event => {
    const target = event.target;
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
    } else if(target === addAd) {
        modalAdd.classList.remove('hide');
        modalBtnSubmit.disabled = true;
    }
    document.body.addEventListener('keydown', closeModal);
};

// Обработка событий

addAd.addEventListener('click', openModal);
modalAdd.addEventListener('click', closeModal);

catalog.addEventListener('click', openModal);

modalItem.addEventListener('click', closeModal);

modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name]=elem.value;
    };
    dataBase.push(itemObj);
    modalSubmit.reset();

    closeModal(event);
});



