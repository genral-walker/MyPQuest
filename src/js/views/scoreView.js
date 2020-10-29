
import { domElements as dom } from './base';

export const updateScore = (score) => dom.gameScore.innerHTML = score;

export const updateHighscores = (localData) => {
    dom.detailsTableBody.innerHTML = '';
    localData.forEach(obj => {
        const markUp = `
        <tr>
            <td>${obj.subject} &nbsp; ${obj.category}</td>
            <td>${obj.score}</td>
        </tr>
    `;
        dom.detailsTableBody.insertAdjacentHTML('beforeend', markUp);
    });
};   