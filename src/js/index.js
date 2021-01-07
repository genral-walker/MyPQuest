
import Form from './models/Form';
import Questions from './models/Questions';
import Score from './models/Score';
import Sessions from './models/Sessions';

import { domElements as dom, domClasslists, addClass, handleLoader, handleModal, updateYear } from './views/base';
import { detailsToggle, tableToggle, closeDetails, toggleSession } from './views/details';
import { animatePageOnLoad, animateStart, reverseStartAnimation } from './views/gsap';
import { getInputs, clearInputs, updateName, retrieveName, readNameStorage, disableInputName } from './views/formView';
import { renderQuestionsAndAnswers as renderQuestion, clearColors, updatePercentage, addHover, removeHover, getGameEndStatus } from './views/questionsView';
import { updateScore, updateHighscores } from './views/scoreView';
import { addSessionHeader, sessionDetails as addDetails, closeALLSessions } from './views/sessionsView';

/** Global state of the app
 * - Form obj (The Form inputs data)
 * - Questions obj (Questions data)
 * - Score obj (Score data)
 * - Sessions obj (Sessions data)
 */
let state = {};

//TESTERS
const hello = (e) => {
    console.log(e.target);
};


//////////GSAP ANIMATION ON PAGELOAD
window.addEventListener('load', animatePageOnLoad);

//////////UPDATE FOOTER YEAR
updateYear();

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


const getStorageHighscores = () => {
    state.score = new Score();
    const highscores = state.score.retrieveHighscoresStorage();
    if (highscores) {
        updateHighscores(highscores);
    }
};
getStorageHighscores();


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

        let lastID = sessions[sessions.length - 1].ID;
        state.sessions.sessionId = lastID;
    }
};
getAlreadyAnswered();


//// GET INPUTS FROM FORM 
const processDataToStart = async () => {

    let query = getInputs();
    state.form = new Form(query);

    try {
        clearInputs();
        handleLoader();

        let res = await state.form.submitQuery();

        state.questions = new Questions(res);

        let questions = state.questions;
        if (questions) {
            let oneQuestion = state.questions.loadQuestion();
            handleLoader();

            setTimeout(() => {
                renderQuestion(oneQuestion);

                //////// THESE INITIALIZES OUTSIDE OF THIS SCOPE //////
                // GETS THE START DATE
                state.sessions.oneSessionDate = {
                    day: state.sessions.date.day(),
                    month: state.sessions.date.month(),
                    year: state.sessions.date.year,
                    hour: state.sessions.date.hour(),
                    minute: state.sessions.date.minute(),
                    amPm: state.sessions.date.amPm(),
                }

                // GETS CORRECT ANSWER PER QUESTIONS 
                state.questions.correctAnswer;
                // 

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


// RUNS WHEN ALL QUESTIONS HAVE BEEN ANSWERED
const gameEnded = () => {
    let formSessionData = state.form.sessionCategorySubject;
    let questions = state.questions.questions;
    let sessionDate = state.sessions.oneSessionDate;
    let ID = state.sessions.sessionId;

    // ADD NEW ANSWERED QUESTIONS TO SESSIONS SECTION
    addSessionHeader(formSessionData, sessionDate, ID);
    addDetails(questions);

    // RETRIEVE EVERY SESSION PLAYED TO STORAGE
    state.sessions.retrieveOneSession(formSessionData, sessionDate, questions, ID);
    state.score.retrieveScore(formSessionData, state.score.score);

    setTimeout(() => {
        handleModal();
        updateHighscores(state.score.retrieveHighscoresStorage());
    }, 1300);
};

/////  VALIDATE CURRENT CLICKED ANSWER
const validateAnswer = () => {

    dom.optionBox.forEach(box => {

        box.addEventListener('click', (ev) => {

            if (box.lastElementChild.classList.contains(`bottom__text--${state.questions.correctAnswer}`)) {
                removeHover();
                box.classList.add(domClasslists.corerct);
                updateScore(++state.score.score);
            } else {
                removeHover();
                ev.target.classList.add(domClasslists.wrong);
                document.querySelector(`.bottom__answer--${state.questions.correctAnswer}`).classList.add(domClasslists.corerct);
            };

            updatePercentage(state.questions.questionLength, state.questions.accumulator);

            state.questions.answered = true;
            let endReached = getGameEndStatus();

            if (endReached === 100) {
                gameEnded();
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


//////// EXITING THE GAME BEFORE GAME END
const exitGame = (value) => {
    let text, approved;

    if (state.questions) {

        if (value !== true) {
            text = 'Restarting Will Erase Your Progress, Do You Really Want To Restart?';
            approved = confirm(text);
        }

        if (approved || value === true) {
            const score = 0;
            state.score.score = score;
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