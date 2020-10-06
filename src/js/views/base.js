
export const domElements = {
    container: document.querySelector('.container'),
    side: document.querySelector('.side'),
    main: document.querySelector('.main'),
    form: document.querySelector('.form'),
    details: document.querySelector('.details'),
    detailsTable: document.querySelector('.details__table'),
    detailsOverview: document.querySelector('.details__overview'),
    gameSection: document.querySelector('.game'),
    formUser: document.querySelector('.form__user'),
    formWelcome: document.querySelector('.form__welcome'),
    formBtn: document.querySelector('.form__btn'),
    formInputs: document.querySelector('.form__inputs'),
    icon: document.querySelector('.side__icon-image'),
    hasEvent: {
        detailScore: document.querySelector('.details__highscores'),
        get profileBtn() {
            let btn;
            window.matchMedia('(max-width: 30em)').matches ? btn = 'btn-img' : btn = 'btn__user';
            let result = document.querySelector(`.${btn}`);
            return result;
        },
    },
  
};

///// CLASSSES USED FOR MANIPULATING
export const domClasslists = {
    detailShow: 'details-show',
    tableShow: 'show',
    noShadow: 'no-shadow',
    hasEvent: 'has-event',
};

///// CLASS ADDED TO  ALL ELEMENT THAT HAS EVENT
export const addClass = obj => {
    for (const key in obj) {
            obj[key].classList.add(domClasslists.hasEvent);
    }
};