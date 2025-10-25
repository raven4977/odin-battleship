import { validateShipPlacement, validateAttackCoordinates } from "./utility.js";

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
  const missedShots = new Set();
  const placeShip = (length, coordinates) => {
    const isValid = validateShipPlacement(
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
  const receiveAttack = (x, y) => {
    const index = validateAttackCoordinates(x, y, missedShots);
    if (index >= 0) {
      if (board[index]) {
        const ship = board[index];
        ship.hit();
        board[index] = false;
        return ship;
      }
      missedShots.add(index);
      return false;
    }
  };
  return {
    board,
    currentShips,
    maxShips,
    placeShip,
    receiveAttack,
    missedShots,
  };
};

module.exports = {
  Ship,
  Gameboard,
};
