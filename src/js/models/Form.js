import axios from 'axios';

export default class Form {
  constructor(values) {
    this.values = values;
  }

  async submitQuery() {
    try {
      this.results = await axios(
        `https://questions.aloc.com.ng/api/v2/q/${this.values[4]}?subject=${this.values[3]}&year=${this.values[1]}&type=${this.values[2]}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AccessToken: 'QB-8ba4d1e0b1933d87f4e6',
          },
        }
      );
      return this.results.data.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  get sessionCategorySubject() {
    return {
      subject: this.changeValueText(this.values[3]),
      category: this.changeValueText(this.values[2]),
    };
  }

  changeValueText(value) {
    switch (value) {
      case 'utme':
        value = 'JAMB';
        return value;
        break;
      case 'wassce':
        value = 'WAEC';
        return value;
        break;
      case 'post-utme':
        value = 'POST-UTME';
        return value;
        break;
      case 'englishlit':
        value = 'English Literature';
        return value;
        break;
      case 'crk':
        value = 'Christian Studies';
        return value;
        break;
      case 'irk':
        value = 'Islamic Studies';
        return value;
        break;
      case 'civiledu':
        value = 'Civil Education';
        return value;
        break;
      case 'currentaffairs':
        value = 'Current Affairs';
        return value;
        break;
      default:
        return this.modifyValueToUpperCase(value);
        break;
    }
  }

  modifyValueToUpperCase(word) {
    let firsLetter, secondLetter, newWord, lastWord;
    newWord = word.split('');
    firsLetter = newWord[0].toUpperCase();
    newWord.splice(0, 1, firsLetter);

    if (newWord.indexOf(' ')) {
      secondLetter = newWord[newWord.indexOf(' ') + 1].toUpperCase();
      newWord.splice(newWord.indexOf(' ') + 1, 1, secondLetter);
    }
    lastWord = newWord.join('');
    return lastWord;
  }
}
