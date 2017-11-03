//abstract class. not to be instantiated directly
class Figure {

  constructor(args) {
    this.isCalculatable = false;

    if(args.length === this.argsNum()) {
      this.isCalculatable = true;
      this.args = args;
    }
  }

  figureName() {}

  argsNum() {}

  calculate() {
    if(this.isCalculatable) {
      return this.makeCalculation();
    }
    else {
      this.errorMessage();
    }
  }

  makeCalculation() {}

  errorMessage() {
    console.warn(`Для расчета площади фигуры ${this.figureName()} требуется ${this.argsNum()} аргумент(а)`);
  }
}

class Square extends Figure {
  constructor(args) {
    super(args);
  }

  figureName() {
    return 'Квадрат';
  }

  argsNum() {
    return 1;
  }

  makeCalculation() {
    let [a] = this.args;
    return parseInt(a) * parseInt(a);
  }
}

class Rectangle extends Figure {
  constructor(args) {
    super(args);
  }

  figureName() {
    return 'Прямоугольник';
  }

  argsNum() {
    return 2;
  }

  makeCalculation() {
    let [a, b] = this.args;
    return parseInt(a) * parseInt(b);
  }
}

class Circle extends Figure {
  constructor(args) {
    super(args);
  }

  figureName() {
    return 'Круг';
  }

  argsNum() {
    return 1;
  }

  makeCalculation() {
    let [a] = this.args;
    return Math.PI * Math.pow(parseInt(a), 2);
  }
}


function calculateArea(type, ...args) {
  let area = null,
      figureName = type,
      input = args;;

  if(type && args.length > 0) {
    let figure;

    switch (type) {
      case 'square':
        figure = new Square(args);
        break;

      case 'rectangle':
        figure = new Rectangle(args);
        break;

      case 'circle':
        figure = new Circle(args);
        break;
    }

    area = figure.calculate();
    figureName = figure.figureName();
  }
  else {
    return 'Введите параметры для расчета';
  }

  return {
    area,
    'figure': figureName,
    input,
  };
}


console.log(calculateArea('square'));
console.log('');

console.group("square");

  console.log("** Called calculateArea('square', 4, 5)");
  console.log(calculateArea('square', 4, 5));
  
  console.log("** Called calculateArea('square', 4)");
  console.log(calculateArea('square', 4));

console.groupEnd();
console.log('');

console.group("rectangle");

  console.log("** Called calculateArea('rectangle', 12)");
  console.log(calculateArea('rectangle', 12));
  
  console.log("** Called calculateArea('rectangle', 5, 12)");
  console.log(calculateArea('rectangle', 5, 12));

console.groupEnd();
console.log('');

console.group("circle");
  
  console.log("** Called calculateArea('circle', 11)");
  console.log(calculateArea('circle', 11));

console.groupEnd();
