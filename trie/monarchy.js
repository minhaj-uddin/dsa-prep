class Person {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.isAlive = true;
  }
}

class Monarchy {
  constructor(king) {
    this.king = new Person(king);
    this._persons = {
      [this.king.name]: this.king,
    };
  }

  birth(childName, parentName) {
    const parent = this._persons[parentName];
    const newChild = new Person(childName);
    parent.children.push(newChild);
    this._persons[childName] = newChild;
  }

  death(name) {
    const person = this._persons[name];
    if (person === undefined) {
      return null;
    }
    person.isAlive = false;
  }

  getSuccession() {
    const familyTree = [];
    this._dfs(this.king, familyTree);
    return familyTree;
  }

  _dfs(currentPerson, familyTree) {
    if (currentPerson.isAlive) {
      familyTree.push(currentPerson.name);
    }

    for (let i = 0; i < currentPerson.children.length; i++) {
      this._dfs(currentPerson.children[i], familyTree);
    }
  }
}

const p = new Monarchy("Jake");
p.birth("Catherine", "Jake");
p.birth("Jane", "Catherine");
p.birth("Farah", "Jane");
p.birth("Tom", "Jake");
p.birth("Celine", "Jake");
p.birth("Mark", "Catherine");
p.birth("Peter", "Celine");
console.log(p.getSuccession());

p.death("Jake");
p.death("Jane");
console.log(p.getSuccession());
