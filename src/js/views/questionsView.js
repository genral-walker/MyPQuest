
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

export const removeHover = () => {
    dom.optionBox.forEach(box => box.classList.remove(domClasslists.hover));
    dom.Gamebottom.style.pointerEvents = 'none';
};


export const updatePercentage = (numbersLength, answerd) => {
  if (numbersLength && answerd) {
    let width = (answerd/numbersLength) * 100;
    dom.progressBar.style.width = `${width}%`;
    dom.gamePercent.innerHTML = Math.round(width);
    return width;
  } else {
    dom.progressBar.style.width = '0%';  
    dom.gamePercent.innerHTML = 0; 
  }
};

export const GameEnd =(width)=>{
    if (width === 100) {
        setTimeout(() => {
            alert('game End')
        }, 2000);
    }
};

export const clearColors = () => {
    dom.optionBox.forEach(box => box.classList.remove(domClasslists.corerct, domClasslists.wrong))
};