
//Thanks alot guys, The issue was I imported axios without using it. I've used it now, its working okay now.

export const domElements = {
    container: document.querySelector('.container'),
    side: document.querySelector('.side'),
    main: document.querySelector('.main'),
    form: document.querySelector('.form'),
    details: document.querySelector('.details'),
    detailsTable: document.querySelector('.details__table'),
    detailsOverview : document.querySelector('.details__overview'),
    detailScore: document.querySelector('.details__highscores'),
    get profileBtn() {
        let btn;
        window.matchMedia("(max-width: 30em)").matches ? btn = 'btn-img' : btn = 'btn__user';
        let result = document.querySelector(`.${btn}`);
        return result;
    },
};

///// CLASSSES USED FOR MANIPULATING
export const domClasslists = {
    detailShow: 'details-show',
    tableShow: 'show',
    noShadow :'no-shadow',
    hasEvent : 'has-event',
};

///// CLASS ADDED TO  ALL ELEMENT THAT HAS EVENT
export const addClass = obj =>{
        for (const key in obj) {
          obj[key].classList.add(domClasslists.hasEvent)
          }
};