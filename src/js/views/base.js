
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
    modal: document.querySelector('.modal'),
    modalBtn: document.querySelector('.modal__btn'),
    detailScore: document.querySelector('.details__highscores'),
    detailSession: document.querySelector('.details__sessions'),
    hasEventChild: {
        detailsOverview: document.querySelector('.details__overview'),
        detailsTable: document.querySelector('.details__table'),
    },
    hasEvent: {
        //  ELEMENTS THAT HAVE EVENTS LISTENERS AND ARE OUTSIDE THE MAIN ELEMENT/CONTAINER
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
    dimContainer: 'dim',
    loading: 'loading',
    answerHover: 'hover',
    corerct: 'right',
    wrong: 'wrong',
    hover: 'hover',
    modalShow: 'modal-show',
    hasEvent: 'has-event',
};


///// CLASS ADDED TO  ALL ELEMENT THAT HAS EVENT
export const addClass = (noChildObj, hasChildObj) => {

    // ELEMNTS WITHOUT CHILDREN
    for (const key in noChildObj) {
        noChildObj[key].classList.add(domClasslists.hasEvent);
    }


    // ELEMNTS WITH CHILDREN
    for (const key in hasChildObj) {
        hasChildObj[key].classList.add(domClasslists.hasEvent);

        // THE FUNCTION BELOW ADDS THE HAS-EVENT CLASS TO ALL THE DESCENDANT OF THE SPECIFIED ELEMENT
        if (hasChildObj[key].children) {

            Array.from(hasChildObj[key].children).forEach(parent1 => {
                parent1.classList.add(domClasslists.hasEvent);

                if (parent1.children) {
                    Array.from(parent1.children).forEach(parent2 => {
                        parent2.classList.add(domClasslists.hasEvent);

                        if (parent2.children) {
                            Array.from(parent2.children).forEach(parent3 => {
                                parent3.classList.add(domClasslists.hasEvent);

                                if (parent3.children) {
                                    Array.from(parent3.children).forEach(parent4 => {
                                        parent4.classList.add(domClasslists.hasEvent);

                                        if (parent4.children) {
                                            Array.from(parent4.children).forEach(parent5 => {
                                                parent5.classList.add(domClasslists.hasEvent);

                                                if (parent5.children) {
                                                    Array.from(parent5.children).forEach(parent6 => {
                                                        parent6.classList.add(domClasslists.hasEvent);

                                                        if (parent6.children) {
                                                            Array.from(parent6.children).forEach(parent7 => {
                                                                parent7.classList.add(domClasslists.hasEvent);


                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }

    }

};


export const handleLoader = () => {
    domElements.container.classList.toggle(domClasslists.dimContainer);
    domElements.loader.classList.toggle(domClasslists.loading);
};

export const handleModal = () => {
    domElements.container.classList.toggle(domClasslists.dimContainer);
    domElements.modal.classList.toggle(domClasslists.modalShow)
};