
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
        }
    },
    childNodes: {
        // ELEMENTS THAT HAVE FULL BODY ANIMATIONS IN THE MAIN ELEMENT/CONTAINER  console.log(e.target.childNodes);
        overviewChildren: document.querySelector('.details__overview').childNodes,
        tableChildren: document.querySelector('.details__table').childNodes,
    }

};

///// CLASSSES USED FOR MANIPULATING
export const domClasslists = {
    detailShow: 'details-show',
    tableShow: 'show',
    noShadow: 'no-shadow',
    slideValidator: 'slide-up',
    hasEvent: 'has-event',
};

///// CLASS ADDED TO  ALL ELEMENT THAT HAS EVENT
export const addClass = obj => {
    for (const key in obj) {
        obj[key].classList.add(domClasslists.hasEvent);
    }
};