
import { domElements as dom, domClasslists } from './base';

const state = {};

export const addSessionHeader = (questionData, dateData, id) => {

    state.id = id;

    const markUp = `
    <div class="session session--${state.id}">
        <div class="session__header">
            <h3 class="session__subject">${questionData.subject}</h3>
            <h3 class="session__category">${questionData.category}</h3>
            <p class="session__date">${dateData.day}/${dateData.month}/${dateData.year}</p>
            <p class="session__time">
            ${dateData.hour}:${dateData.minute} ${dateData.amPm}
            </p>
        </div>
    </div>
        `;
    dom.hasEventChild.sessions.insertAdjacentHTML('beforeend', markUp);
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
    const sessionContainer = document.querySelector(`.session--${state.id}`);
    questions.forEach(question => {
        const markUp = `
        
        <div class="session__details session__details--${state.id}">
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