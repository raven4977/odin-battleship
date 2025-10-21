const { validate } = require("./utility");

class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.sunk = false;
  }
  hit() {
    this.damage++;
  }
}

module.exports = {
  Ship,
};
