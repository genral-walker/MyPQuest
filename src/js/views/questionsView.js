
import { domElements as dom, domClasslists } from './base';

const renderQuestion = data => {
    if (data.section) {
        dom.question.innerHTML = `${data.section} &nbsp; ${data.question}`;
    } else {
        dom.question.innerHTML = data.question;
    }
};

const renderOptions = data => {
    dom.optionA.innerHTML = data.option.a;
    dom.optionB.innerHTML = data.option.b;
    dom.optionC.innerHTML = data.option.c;
    dom.optionD.innerHTML = data.option.d;

};

export const renderQuestionsAndAnswers = data => {
    renderQuestion(data);
    renderOptions(data);
};

export const addHover = () => {
    dom.optionBox.forEach(box => box.classList.add(domClasslists.hover));
    dom.Gamebottom.style.pointerEvents = 'auto';
};

const removeHover = () => {
    dom.optionBox.forEach(box => box.classList.remove(domClasslists.hover));
    dom.Gamebottom.style.pointerEvents = 'none';
};

export const isCorrect = (correctOption, box, ev) => {
    let reightOption = correctOption;
    if (reightOption) {
        if (box.lastElementChild.classList.contains(`bottom__text--${reightOption}`)) {
            removeHover();
            box.classList.add(domClasslists.corerct);

        } else {
            removeHover();
            ev.target.classList.add(domClasslists.wrong);
            document.querySelector(`.bottom__answer--${reightOption}`).classList.add(domClasslists.corerct);

        }
    }

};

export const clearColors = () => {
    dom.optionBox.forEach(box => box.classList.remove(domClasslists.corerct, domClasslists.wrong))
};