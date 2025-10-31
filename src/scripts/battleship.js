import { validate } from "./utility.js";

class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.sunk = false;
    this.coordinates = [];
  }

  hit() {
    this.damage++;
    this.isSunk();
    return this;
  }

  isSunk() {
    if (this.damage === this.length) this.sunk = true;
    return this.sunk;
  }
}

const Gameboard = () => {
  const board = new Array(100).fill(null);
  const maxShips = {
    length1: 4,
    length2: 3,
    length3: 2,
    length4: 1,
  };
  const totalShips = {
    length1: 0,
    length2: 0,
    length3: 0,
    length4: 0,
  };
  const placedShips = new Set();
  const previousAttacks = new Set();
  const missedAttacks = new Set();
  const placeShip = (length, coordinates) => {
    const valid = validate.validateShipPlacement(
      length,
      coordinates,
      board,
      maxShips,
      totalShips
    );
    if (valid) {
      const ship = new Ship(length);
      ship.coordinates = coordinates;
      totalShips[`length${length}`]++;
      placedShips.add(ship);
      coordinates.forEach((coordinate) => (board[coordinate] = ship));
    }
  };
  const receiveAttack = (index) => {
    if (previousAttacks.has(index)) return;
    previousAttacks.add(index);
    if (board[index]) {
      const ship = board[index];
      ship.hit();
      return ship;
    }
    missedAttacks.add(index);
    return board[index];
  };
  return {
    board,
    maxShips,
    totalShips,
    placeShip,
    receiveAttack,
    previousAttacks,
    missedAttacks,
  };
};

export { Ship, Gameboard };
