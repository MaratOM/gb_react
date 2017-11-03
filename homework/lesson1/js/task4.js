class Worksheet {
  constructor(questions) {
    this.questions = questions;
    this.personData = [];
  }

  *askQuestion() {
    let fieldName,
        personFieldData,
        questionText;

    for(let i = 0; i < this.questions.length; i++) {
      fieldName = yield;

      questionText = this.questions.find(question => question.fieldName == fieldName)['questionText'];
      personFieldData = prompt(`Пожалуйста, заполните поле "${questionText}"`) || 'Нет ответа';

      this.personData.push(
          {[`${fieldName}`]: personFieldData}
      );
    }
  }

  surveyStart() {
    let askQuestion = this.askQuestion();

    //пропускаем первую итерацию, чтобы передавать параметры в yield
    askQuestion.next();

    this.questions.forEach(function (question) {
      askQuestion.next(question.fieldName);
    });

    return this.personData;
  }
}


let questions = [
  {
    fieldName: 'name',
    questionText : 'Имя'
  },
  {
    fieldName: 'surname',
    questionText : 'Фамилия'
  },
  {
    fieldName: 'age',
    questionText : 'Возраст'
  },
  {
    fieldName: 'profession',
    questionText : 'Профессия'
  },
];

let worksheet = new Worksheet(questions);
let personData = worksheet.surveyStart();
console.log(personData);