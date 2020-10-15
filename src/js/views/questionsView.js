
import {domElements as dom} from './base';

const renderQuestion = data =>{
    if (data.section) {
        dom.question.innerHTML = `${data.section} &nbsp; ${data.question}`
    } else {
        dom.question.innerHTML = data.question
    }
};

const renderOptions = data => {
   dom.optionA.innerHTML = data.option.a;
   dom.optionB.innerHTML = data.option.b;
   dom.optionC.innerHTML = data.option.c;
   dom.optionD.innerHTML = data.option.d;
};

export const renderQuestionsAndAnswers = data =>{
    renderQuestion(data);
    renderOptions(data);
};

