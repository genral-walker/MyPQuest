
import Form from './models/Form';
import Questions from './models/Questions';
import Score from './models/Score';
import Sessions from './models/Sessions';

import { domElements as dom, domClasslists, addClass, handleLoader, handleModal } from './views/base';
import { detailsToggle, tableToggle, closeDetails, toggleSession } from './views/details';
import { animatePageOnLoad, animateStart, reverseStartAnimation } from './views/gsap';
import { getInputs, clearInputs, updateName, retrieveName, readNameStorage, disableInputName } from './views/formView';
import { renderQuestionsAndAnswers as renderQuestion, clearColors, updatePercentage, addHover, removeHover } from './views/questionsView';
import { updateScore } from './views/scoreView';
import { addSessionHeader, sessionDetails as addDetails, closeALLSessions } from './views/sessionsView';

/** Global state of the app
 * -
 */

let state = {};

//TESTERS
const hello = (e) => {
    console.log(e.target);
};


//////////GSAP ANIMATION ON PAGELOAD
window.addEventListener('load', animatePageOnLoad);

///// ADDS AN EVENT CLASS TO ALL ELEMENTS IN DOMCLASSLIST. USED TO NULIFY DETAILS SLIDE ANIMATION. 
addClass(dom.hasEvent, dom.hasEventChild);

/*
******  DETAILS-VIEW CONTROLLER *******
*/
//////// TOGGLE DETAILS SECTION

dom.hasEvent.profileBtn.addEventListener('click', detailsToggle);
//////// TOGGLE DETAILS TABLE SECTION
dom.btnDetailsScore.addEventListener('click', tableToggle);
///////// CLOSE DETAILS SECTION
document.addEventListener('click', closeDetails);
//////// TOGGLE DETAILS__SESSION SECTION
dom.btnDetailsSession.addEventListener('click', toggleSession);
///////// CLOSE DETAILS__SESSION SECTION
dom.btnSessionsExit.addEventListener('click', () => { closeALLSessions(), toggleSession() });

/*
****** SESSIONS-VIEW CONTROLLER *******
*/

dom.hasEventChild.sessions.addEventListener('click', (e) => {
    if (e.target.matches('div.session__header')) {
        e.target.parentNode.classList.toggle(domClasslists.slideSession);
    }
});

//////// UPDATE PROFILE NAME
dom.formName.addEventListener('input', () => { updateName(dom.formName.value) });

// GET NAME FROM LOCAL STORAGE OR FROM USER
const getName = () => {
    if (readNameStorage()) {
        updateName(readNameStorage());
        disableInputName();
        dom.welcomeBack.style.display = 'inline-block';
    } else {
        dom.formName.addEventListener('focusout', retrieveName);
    }
};
getName();

//RETRIEVE PAST ANSWERED QUESTIONS
const getAlreadyAnswered = () => {

    state.sessions = new Sessions();
    let sessions = state.sessions.retrieveSessionsStorage();

    if (sessions) {
        sessions.forEach(session => {
            
            // ADD ANSWERED QUESTIONS TO SESSIONS SECTION
            addSessionHeader(session.formInfo, session.dateInfo, session.ID);
            addDetails(session.questions);

        });
    
        let lastID = sessions[sessions.length -1].ID;

        state.sessions.sessionId = lastID;
    }
};
getAlreadyAnswered();

//// GET INPUTS FROM FORM 
const processDataToStart = async () => {

    let query = getInputs();
    state.form = new Form(query);

    try {
        handleLoader();

        let res = await state.form.submitQuery();

        state.questions = new Questions(res);

        clearInputs();

        let questions = state.questions;
        if (questions) {
            let oneQuestion = state.questions.loadQuestion();
            handleLoader();

            setTimeout(() => {
                renderQuestion(oneQuestion);

                // THESE INITIALIZES OUTSIDE OF THIS SCOPE
                state.questions.correctAnswer;
                state.score = new Score();

                animateStart();
            }, 270);
        }

    } catch (error) {
        handleLoader();
        alert('Uh Uh Something Went Wrong, It May Be Poor Connection or Delay In Response.     please try again. 😢');
    }
};


//////// GAME START AFTER INPUTS RECEIVED SUCCESFULLY
dom.form.addEventListener('submit', (e) => {
    e.preventDefault();
    processDataToStart();
});


/////  VALIDATE CURRENT ANSWER
const isCorrect = (correctOption, box, ev) => {
    let reightOption = correctOption;
    if (reightOption) {
        if (box.lastElementChild.classList.contains(`bottom__text--${reightOption}`)) {
            removeHover();
            box.classList.add(domClasslists.corerct);
            updateScore(state.score.score);
        } else {
            removeHover();
            ev.target.classList.add(domClasslists.wrong);
            document.querySelector(`.bottom__answer--${reightOption}`).classList.add(domClasslists.corerct);

        }
    }

};


const validateAnswer = () => {

    dom.optionBox.forEach(box => {
        box.addEventListener('click', (ev) => {
            isCorrect(state.questions.correctAnswer, box, ev);
            state.questions.answered = true;

            let endReached = updatePercentage(state.questions.questionLength, state.questions.accumulator);

            // THIS CHECKS TO SEE IF THR RETURN VALUE ABOVE IS 100
            if (endReached === 100) {

                let formSessionData = state.form.sessionCategorySubject;
                let questions = state.questions.questions;
                let sessionDate = state.sessions.sessionDate;
                let ID = state.sessions.sessionId;

                console.log(ID);
                // ADD NEW ANSWERED QUESTIONS TO SESSIONS SECTION
                let dateData = addSessionHeader(formSessionData, sessionDate, ID);
                addDetails(questions);

                console.log(ID);
                // RETRIEVE EVERY SESSION PLAYED
                state.sessions.retrieveOneSession(formSessionData, dateData, questions, ID);

                setTimeout(() => {
                    handleModal();
                }, 1300);
            }
        });
    });

};
validateAnswer();

///// LOAD NEXT QUESTION AFTER EVERY ANSWERED QUESTION
const nextQuestion = () => {
    if (state.questions.answered) {
        clearColors();
        addHover();
        let newQuestion = state.questions.loadQuestion();
        renderQuestion(newQuestion);
        state.questions.answered = false;
    }

};
dom.gameBtn.addEventListener('click', nextQuestion);


//////// EXITING THE GAME
const exitGame = (value) => {
    let text, approved;

    if (state.questions) {

        if (value !== true) {
            text = 'Restarting Will Erase Your Progress, Do You Really Want To Restart?';
            approved = confirm(text);
        }

        if (approved || value === true) {
            let score = state.score.score = 0;
            reverseStartAnimation();
            updatePercentage();
            updateScore(score);
            clearColors();
            addHover();
            state.questions = undefined;
        }
    }

};
dom.hasEvent.btnExit.addEventListener('click', exitGame);

// FOR MODAL END BTN 
dom.modalBtn.addEventListener('click', () => {
    handleModal();
    setTimeout(() => {
        exitGame(true);
    }, 1100);
});