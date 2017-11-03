class Human {
  constructor(name, age, dateOfBirth) {
    this.name = name;
    this.age = age;
    this.dateOfBirth = dateOfBirth;
  }

  displayInfo() {
    console.log(`${this.name} ${this.age} ${this.dateOfBirth}`);
  }
}

class Employee extends Human {
  constructor(name, age, dateOfBirth, salary, department) {
    super(name, age, dateOfBirth);

    this.salary = salary;
    this.department = department;
  }

  displayInfo() {
    super.displayInfo();
    console.log(`${this.salary} ${this.department}`);
  }
}

class Manager extends Employee {
  constructor(name, age, dateOfBirth, salary, department) {
    super(name, age, dateOfBirth, salary, department);

    this.developers = [];
  }

  addDeveloper(developer) {
    if(!this.isInManagerList(developer)) {
      this.addToManagerList(developer);
      developer.assignManager(this);
    }
  }

  removeDeveloper(developer) {
    this.removeFromManagerList(developer);
    developer.unassignManager();
  }

  isInManagerList(developer) {
    return this.developers.find(dev => dev === developer);
  }

  addToManagerList(developer) {
    this.developers.push(developer);
  }

  removeFromManagerList(developer) {
    this.developers = this.developers.filter(function(dev) {
      return dev !== developer;
    });
  }

  displayInfo() {
    super.displayInfo();
    console.log('Developers');
    console.log(this.developers);
  }
}

class Developer extends Employee {
  constructor(name, age, dateOfBirth, salary, department, manager = null) {
    super(name, age, dateOfBirth, salary, department);

    this.assignedManager = manager;
  }

  changeManager(manager) {
    if(this.assignedManager !== null) {
      this.assignedManager.removeFromManagerList(this);
      this.unassignManager();
    }

    if(manager) {
      if (!manager.isInManagerList(this)) {
        manager.addToManagerList(this);
      }

      this.assignManager(manager);
    }
  }

  removeManager() {
    this.changeManager(null);
  }

  assignManager(manager) {
    this.unassignManager(manager);
    this.assignedManager = manager;
  }

  unassignManager() {
    this.assignedManager = null;
  }

  displayInfo() {
    super.displayInfo();
    console.log('Manager');
    console.log(this.assignedManager);
  }
}

let manager1 = new Manager('John', 28, '11-10-89', 100000, 'department');
let manager2 = new Manager('Bill', 28, '11-10-89', 100000, 'department');

let developer1 = new Developer('Mary', 28, '11-10-89', 100000, 'department');
let developer2 = new Developer('Paul', 28, '11-10-89', 100000, 'department');
let developer3 = new Developer('George', 28, '11-10-89', 100000, 'department');
let developer4 = new Developer('Desmond', 28, '11-10-89', 100000, 'department');

console.log("** Called manager1.addDeveloper(developer1)");
manager1.addDeveloper(developer1);
developer1.displayInfo();
console.log('');

console.log("** Called developer1.changeManager(manager2)");
developer1.changeManager(manager2);
developer1.displayInfo()
console.log('');

console.log("** Called developer2.changeManager(manager2)");
developer2.changeManager(manager2);
developer2.displayInfo();
console.log('');
manager2.displayInfo();
console.log('');

console.log("** Called manager2.removeDeveloper(developer1);");
manager2.removeDeveloper(developer1);
manager2.displayInfo();
