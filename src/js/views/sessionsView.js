
import { domElements as dom, domClasslists } from './base';


export const header = (questionData, dateData) => {

    return `
    <div class="session session--${dateData.minute}">
                  <div class="session__header">
                    <h3 class="session__subject">${questionData.subject}</h3>
                    <h4 class="session__category">${questionData.category}</h4>
                    <p class="session__date">${dateData.day}/${dateData.month}/${dateData.year}</p>
                    <p class="session__time">${dateData.hour}:${dateData.minute} ${dateData.hour >= 12 ? 'PM' : 'AM'}</p>
                  </div>              
    </div>
    `;
};

const addAnswered = (question, answer, solution) => {
    return `
    <div class="session__details">
    <p class="session__question">
      <span class="session__text-header">QUESTION:</span>
      <span class="session__text">
      ${question}
      </span>
      </p>
    <p class="session__answer">
      <span class="session__text-header">ANSWER:</span>
      <span class="session__text">
      ${answer}
        </span>
    </p>
    <p class="session__solution">
      <span class="session__text-header">SOLUTION:</span>
      <span class="session__text">
      ${solution}
      </span>    
    </p>
  </div>
    `;
};


export const updateSession = (questionLength, sessionData) => {

};