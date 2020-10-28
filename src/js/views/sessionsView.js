
import { domElements as dom, domClasslists } from './base';

let ID;
const date = {};


export const addSessionHeader = (questionData, dateData, id) => {

    try {
        date.day = dateData.day();
        date.month = dateData.month();
        date.hour = dateData.hour();
        date.minute = dateData.minute();
        date.amPm = dateData.amPm();
    } catch (error) {
        date.day = dateData.day;
        date.month = dateData.month;
        date.hour = dateData.hour;
        date.minute = dateData.minute;
        date.amPm = dateData.amPm;
    }
    date.year = dateData.year;
    ID = id;
    console.log(ID);
    let markUp = `
    <div class="session session--${ID}">
        <div class="session__header">
            <h3 class="session__subject">${questionData.subject}</h3>
            <h3 class="session__category">${questionData.category}</h3>
            <p class="session__date">${date.day}/${date.month}/${date.year}</p>
            <p class="session__time">
            ${date.hour}:${date.minute} ${date.amPm}
            </p>
        </div>
    </div>
        `;
    dom.hasEventChild.sessions.insertAdjacentHTML('beforeend', markUp);
    return date;
};


const ifSolution = (solution) => {
    if (solution) {
        return `
        <p class="session__solution">
            <span class="session__text-header">SOLUTION:</span>
            <span class="session__text-solution">
                ${solution}
            </span>
        </p>
        `
    } else {
        return '';
    }
};

const checkForSection = (section, question) => {
    if (section) {
        return section + ' &nbsp; ' + question;
    } else {
        return question;
    }
};

export const sessionDetails = (questions) => {
 console.log(ID);
    let sessionContainer = document.querySelector(`.session--${ID}`);
    questions.forEach(question => {

        let markUp = `
        
        <div class="session__details session__details--${ID}">
            <p class="session__question">
                <span class="session__text-header">QUESTION:</span>
                <span class="session__text-question">
                ${checkForSection(question.section, question.question)} 
                </span>
            </p>
            <p class="session__answer">
                <span class="session__text-header">ANSWER:</span>
                <span class="session__text-answer">
                    ${question.option[question.answer]}
                </span>
            </p>
                ${ifSolution(question.solution)}
        </div>
        `;
        sessionContainer.insertAdjacentHTML('beforeend', markUp);
    });

};

export const closeALLSessions = () => {
    document.querySelectorAll('.session').forEach(session => session.classList.remove(domClasslists.slideSession))
};