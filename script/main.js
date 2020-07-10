'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

// Переменные
const modalAdd = document.querySelector('.modal__add'),
    modalItem = document.querySelector('.modal__item'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    catalog = document.querySelector('.catalog'),
    modalBtnWarning = document.querySelector('.modal__btn-warning'),
    modalFileInput = document.querySelector('.modal__file-input'),
    modalFileBtn = document.querySelector('.modal__file-btn'),
    modalImageAdd = document.querySelector('.modal__image-add'),
    modalContent = modalItem.querySelector('.modal__content');

const textFileBtn = modalFileBtn.textContent,
    srcImageAdd = modalImageAdd.src;


const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');

const infoPhoto = {};

// Сохранение в local Storage
const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

// Функции
const closeModal = event => {
        const target = event.target;
        if (target.closest('.modal__close') ||
            target.classList.contains('modal') ||
            event.code === 'Escape') {
            modalAdd.classList.add('hide');
            modalItem.classList.add('hide');
            modalSubmit.reset();
            modalFileBtn.textContent = textFileBtn;
            modalImageAdd.src = srcImageAdd;
            document.body.removeEventListener('keydown', closeModal);
            checkForm();
        };
    },
    openModal = event => {
        const target = event.target;
        if (target.closest('.card')) {
            const dataId = target.closest('.card').dataset.id;
            modalItem.classList.remove('hide');
            renderModal(dataId);
        } else if (target === addAd) {
            modalAdd.classList.remove('hide');
            modalBtnSubmit.disabled = true;
        }
        document.body.addEventListener('keydown', closeModal);
    },
    checkForm = () => {
        const validForm = elementsModalSubmit.every(elem => elem.value);
        modalBtnSubmit.disabled = !validForm;
        modalBtnWarning.style.display = validForm ? 'none' : '';
    };

// Рендер
const readerCard = () => {
    catalog.textContent = '';

    dataBase.forEach((item, i) => {
        catalog.insertAdjacentHTML('beforeend',
            `<li class="card" data-id="${i}">
                <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
                <div class="card__description">
                    <h3 class="card__header">${item.nameItem}</h3>
                    <div class="card__price">${item.costItem} ₽</div>
                </div>
            </li>`
        );
    });
},
renderModal = id => {
    modalContent.textContent = '';
    const e= +id;

    dataBase.forEach((item, i)=> {
        if (i === e) {
            modalContent.insertAdjacentHTML('beforeend',
            `
                <div><img class="modal__image modal__image-item" src="data:image/jpeg;base64,${item.image}" alt="test"></div>
                <div class="modal__description">
                    <h3 class="modal__header-item">${item.nameItem}</h3>
                    <p>Состояние: <span class="modal__status-item">${item.status}</span></p>
                    <p>Описание:
                        <span class="modal__description-item">${item.descriptionItem}</span>
                    </p>
                    <p>Цена: <span class="modal__cost-item">${item.costItem} ₽</span></p>
                    <button class="btn">Купить</button>
                </div>  
            `);
        }
    })
}; 


// Обработка событий

addAd.addEventListener('click', openModal);
modalAdd.addEventListener('click', closeModal);

catalog.addEventListener('click', openModal);

modalItem.addEventListener('click', closeModal);

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    };
    itemObj.image = infoPhoto.base64;
    dataBase.push(itemObj);
    modalSubmit.reset();
    saveDB();
    
    closeModal({target: modalAdd});
    readerCard();
});

modalFileInput.addEventListener('change', event => {
    const target = event.target,
        reader = new FileReader(),
        file = target.files[0];

    infoPhoto.name = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);
    reader.addEventListener('load', event => {
        if (infoPhoto.size < 200000) {
            modalFileBtn.textContent = infoPhoto.name;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
        } else {
            alert('Файл не должен превышать 200кб');
            modalFileInput.value = '';
            checkForm();
        }

    });

});

readerCard(); 