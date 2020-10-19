
import gsap from 'gsap';
import { domElements as dom } from './base';


// Animation on page laod.
const loadTl = gsap.timeline({
    delay: .2
});

const directSide = () => {
    if (window.matchMedia('(max-width: 720px)').matches) {
        loadTl.to(dom.side, { duration: .8, y: '0%' })
    } else {
        loadTl.to(dom.side, { duration: .8, x: '0%' })
    }
};

const welcomeShow = (elem, timeline, delay = .2) => {
    timeline.fromTo(elem, { opacity: 0, y: '70%' }, { duration: .3, delay: delay, y: '0%', opacity: 1 })
};

const iconBounce = () => {
    if (window.matchMedia('(max-width: 45em)').matches) {
        loadTl.fromTo(dom.icon, { y: '-50%', opacity: 0 }, { delay: .17, duration: .9, y: '0%', opacity: 1, ease: 'bounce.out' })
    } else {
        loadTl.fromTo(dom.icon, { y: '-80%', opacity: 0 }, { delay: .17, duration: .9, y: '0%', opacity: 1, ease: 'bounce.out' })
    }
};

const slideForm = () => {
    if (window.matchMedia('(max-width: 1200px)').matches) {
        loadTl.fromTo(dom.formInputs, { duration: .9, x: '13%', opacity: 0 }, { duration: .7, x: '0%', opacity: 1 })
    } else {
        loadTl.fromTo(dom.formInputs, { duration: .9, x: '19%', opacity: 0 }, { duration: .7, x: '0%', opacity: 1 })
    }

};

const animateBtn = (timeline, elemnt) => {
    timeline.fromTo(elemnt, { opacity: 0, y: '-60%' }, { duration: .2, opacity: 1, y: 0 })
};

///// loadTl complete timeline
export const animatePageOnLoad = () => {
    directSide()
    loadTl.to(dom.form, { duration: 1.5, x: '0%', ease: 'power1.out' }, '-.15')
    welcomeShow(dom.formUser, loadTl)
    welcomeShow(dom.formWelcome, loadTl)
    slideForm()
    animateBtn(loadTl, dom.formBtn)
    iconBounce()
};



/////////////////
/// ANIMATION AFTER FORM FILLED
////////////////
let gameStarted;
const startGame = gsap.timeline();
const slideAnswers = () => {
    dom.optionBox.forEach(box => welcomeShow(box, startGame, 0));
};

export const animateStart = () => {
    if (gameStarted === false) {
        startGame.play();
        gameStarted = true;
    } else {
        startGame.to(dom.form, { duration: 1.4, x: '200%', display: 'none' })
            .to(dom.gameSection, { delay: -.5, duration: 0, display: 'block' })
        welcomeShow(dom.gameTop, startGame, 0)
        slideAnswers()
        startGame.fromTo(dom.gameBtn, { opacity: 0, y: '35%' }, { delay: .3, duration: 1, y: 0, opacity: 1 })
        gameStarted = true;
    }

};

export const reverseStartAnimation = () => {
    if (gameStarted) {
            startGame.reverse();
            gameStarted = false;
    }
}

export const reverseForEnd = () => {
    startGame.reverse();
    gameStarted = false;
};