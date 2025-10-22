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
  isSunk() {
    if (this.length == this.damage) this.sunk = true;
    return this.sunk;
  }
}

const Gameboard = () => {
  const board = new Array(100).fill(false);
  const currentShips = {
    length1: 0,
    length2: 0,
    length3: 0,
    length4: 0,
  };
  const maxShips = {
    length1: 4,
    length2: 3,
    length3: 2,
    length4: 1,
  };
  const placeShip = (length, coordinates) => {
    const isValid = validate(
      length,
      coordinates,
      currentShips,
      maxShips,
      board
    );
    if (isValid) {
      const ship = new Ship(length);
      currentShips[`length${length}`]++;
      coordinates.forEach((coordinate) => (board[coordinate] = ship));
    }
  };
  return { board, currentShips, maxShips, placeShip };
};

module.exports = {
  Ship,
  Gameboard,
};
