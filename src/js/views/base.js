
export const domElements = {
    container: document.querySelector('.container'),
    side: document.querySelector('.side'),
    main: document.querySelector('.main'),
    details: document.querySelector('.details'),
    gameSection: document.querySelector('.game'),
    formUser: document.querySelector('.form__user'),
    formWelcome: document.querySelector('.form__welcome'),
    formBtn: document.querySelector('.form__btn'),
    formInputs: document.querySelector('.form__inputs'),
    icon: document.querySelector('.side__icon-image'),
    formName: document.querySelector('#name'),
    formMobile: document.querySelector('#mobile'),
    formYear: document.querySelector('#year'),
    formCategory: document.querySelector('#category'),
    formSubject: document.querySelector('#subject'),
    formNumbers: document.querySelector('#numbers'),
    form: document.querySelector('.form'),
    btnForm: document.querySelector('.form__btn'),
    validateName: document.querySelector('.validator__text--name'),
    validateMobile: document.querySelector('.validator__text--mobile'),
    gameTop: document.querySelector('.top'),
    gameBtn: document.querySelector('.foot__btn'),
    loader: document.querySelector('.loader'),
    question: document.querySelector('.top__question-text'),
    Gamebottom: document.querySelector('.bottom'),
    optionBox: document.querySelectorAll('.bottom__answer'),
    optionA: document.querySelector('.bottom__text--a'),
    optionB: document.querySelector('.bottom__text--b'),
    optionC: document.querySelector('.bottom__text--c'),
    optionD: document.querySelector('.bottom__text--d'),
    userAll: document.querySelectorAll('.user'),
    gamePercent: document.querySelector('.percentage'),
    progressBar: document.querySelector('.progress-bar'),
    gameScore: document.querySelector('.score'),
    hasEvent: {
        //  ELEMENTS THAT HAVE EVENTS LISTENERS AND ARE OUTSIDE THE MAIN ELEMENT/CONTAINER
        detailsOverview: document.querySelector('.details__overview'),
        detailsTable: document.querySelector('.details__table'),
        detailScore: document.querySelector('.details__highscores'),
        get profileBtn() {
            let btn;
            window.matchMedia('(max-width: 30em)').matches ? btn = 'btn-img' : btn = 'btn__user';
            let result = document.querySelector(`.${btn}`);
            return result;
        },
        get btnExit() {
            let btn;
            window.matchMedia('(max-width: 30em)').matches ? btn = 'btn-img__2' : btn = 'btn__exit';
            let result = document.querySelector(`.${btn}`);
            return result;
        }
    },
};

///// CLASSSES USED FOR MANIPULATING
export const domClasslists = {
    detailShow: 'details-show',
    tableShow: 'show',
    noShadow: 'no-shadow',
    slideValidator: 'slide-up',
    dimContainer :'dim',
    loading: 'loading',
    answerHover : 'hover',
    corerct: 'right',
    wrong: 'wrong',
    hover: 'hover',
    hasEvent: 'has-event',
};

///// CLASS ADDED TO  ALL ELEMENT THAT HAS EVENT
export const addClass = obj => {
    for (const key in obj) {
        obj[key].classList.add(domClasslists.hasEvent);
    }
};


export const handleLoader = ()=>{
    domElements.container.classList.toggle(domClasslists.dimContainer);
    domElements.loader.classList.toggle(domClasslists.loading);  
};