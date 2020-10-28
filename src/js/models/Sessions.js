
export default class Sessions {
    constructor() {
        this._sessionId = 1;
        this._allSessions = [];
    }

    get sessionDate() {
        let date = new Date();
        return {
            day() {
                let day = date.getDate();
                return day < 10 ? '0' + day : day;
            },
            month() {
                let month = date.getMonth() + 1;
                return month < 10 ? '0' + month : month;
            },
            year: parseFloat((date.getFullYear().toString()).slice(2)),
            hour() {
                let hour = date.getHours();
                hour %= 12;
                return hour = hour != 0 ? hour : 12;
            },
            minute() {
                let minute = date.getMinutes();
                return minute < 10 ? '0' + minute : minute;
            },
            amPm() {
                let hour = date.getHours();
                return hour >= 12 ? 'PM' : 'AM';
            },
        }
    }

    get sessionId() {
        return this._sessionId++;
    }

    set sessionId(idValue) {
        this._sessionId = idValue + 1;
    }

    retrieveOneSession(formSession, dateObj, questions, id) {

        let sessionData = {
            formInfo: formSession,
            dateInfo: dateObj,
            questions: questions,
            ID: id
        };
        this._allSessions.push(sessionData);
        localStorage.setItem('allSessions', JSON.stringify(this._allSessions));
    }

    retrieveSessionsStorage() {
        const allSessions = JSON.parse(localStorage.getItem('allSessions'));
        // RESTORE PAST SESSIONS FROM LOCAL STORAGE
        if (allSessions) {
            // localStorage.removeItem('allSessions');
            this._allSessions = allSessions;
            return this._allSessions
        };
    }
}