const { Ship, Gameboard } = require("./battleship");
const {
  validateShipPlacement,
  validateAttackCoordinates,
} = require("./utility");

test("Ship creation: creates ship object with correct initial properties", () => {
  expect(new Ship(4)).toEqual({
    length: 4,
    damage: 0,
    sunk: false,
  });
});

test("Ship hit: increments damage counter by 1", () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.damage).toBe(1);
});

test("Ship sinking: marks ship as sunk when damage equals length", () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Ship sinking: ship remains afloat when damage is less than length", () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("Ship placement validation: accepts valid ship length matching coordinates", () => {
  const game = Gameboard();
  expect(
    validateShipPlacement(
      3,
      [1, 2, 3],
      game.currentShips,
      game.maxShips,
      game.board
    )
  ).toBe(true);
});

test("Ship placement validation: rejects ship length not matching coordinates count", () => {
  const game = Gameboard();
  expect(
    validateShipPlacement(
      5,
      [1, 2, 3, 4],
      game.currentShips,
      game.maxShips,
      game.board
    )
  ).toBe(false);
});

test("Ship placement validation: rejects coordinates with invalid values", () => {
  const game = Gameboard();
  expect(
    validateShipPlacement(
      4,
      [-1, 2, 3, 4],
      game.currentShips,
      game.maxShips,
      game.board
    )
  ).toBe(false);
});

test("Ship placement validation: accepts valid coordinate indices within board bounds", () => {
  const game = Gameboard();
  expect(
    validateShipPlacement(
      4,
      [10, 11, 12, 13],
      game.currentShips,
      game.maxShips,
      game.board
    )
  ).toBe(true);
});

test("Ship placement: successfully places ship spanning multiple board indices", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(4, [0, 1, 2, 3]);
  game.placeShip(3, [4, 5, 6]);
  expect(board.slice(0, 3)).toEqual([
    {
      length: 4,
      damage: 0,
      sunk: false,
    },
    {
      length: 4,
      damage: 0,
      sunk: false,
    },
    {
      length: 4,
      damage: 0,
      sunk: false,
    },
  ]);
  expect(board.slice(4, 7)).toEqual([false, false, false]);
});

test("Ship placement: successfully places single-length ship", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(1, [9]);
  expect(board.slice(9, 10)).toEqual([
    {
      length: 1,
      damage: 0,
      sunk: false,
    },
  ]);
});

test("Ship placement: rejects overlapping ship placement", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(4, [0, 1, 2, 3]);
  game.placeShip(3, [4, 5, 6]);
  expect(board.slice(4, 7)).toEqual([false, false, false]);
});

test("Ship placement: successfully places non-overlapping ships", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(4, [0, 1, 2, 3]);
  game.placeShip(3, [5, 6, 7]);
  expect(board.slice(5, 8)).toEqual([
    {
      length: 3,
      damage: 0,
      sunk: false,
    },
    {
      length: 3,
      damage: 0,
      sunk: false,
    },
    {
      length: 3,
      damage: 0,
      sunk: false,
    },
  ]);
});

test("Ship placement: rejects ship when maximum count for that length is reached", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(4, [0, 1, 2, 3]);
  game.placeShip(4, [5, 6, 7, 8]);
  expect(board.slice(5, 9)).toEqual([false, false, false, false]);
});

test("Ship placement: rejects ship when length doesn't match coordinates array length", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(3, [0, 1, 2, 3]);
  expect(board.slice(0, 4)).toEqual([false, false, false, false]);
});

test("Ship placement validation: accepts horizontal placement at row edge", () => {
  const game = Gameboard();
  expect(
    validateShipPlacement(
      2,
      [8, 9],
      game.currentShips,
      game.maxShips,
      game.board
    )
  ).toBe(true);
});

test("Ship placement validation: rejects coordinates that wrap to next row", () => {
  const game = Gameboard();
  expect(
    validateShipPlacement(
      2,
      [9, 10],
      game.currentShips,
      game.maxShips,
      game.board
    )
  ).toBe(false);
});

test("Ship placement validation: accepts valid vertical placement on board edge", () => {
  const game = Gameboard();
  expect(
    validateShipPlacement(
      3,
      [9, 19, 29],
      game.currentShips,
      game.maxShips,
      game.board
    )
  ).toBe(true);
});

test("Attack validation: rejects user coordinates outside valid range (1-10)", () => {
  const game = Gameboard();
  expect(validateAttackCoordinates(0, 11, game.missedShots)).toBe(false);
});

test("Attack validation: accepts user coordinates within valid range (1-10)", () => {
  const game = Gameboard();
  expect(typeof validateAttackCoordinates(1, 10, game.missedShots)).toBe(
    "number"
  );
});

test("Receive attack: returns ship object with incremented damage when hitting a ship", () => {
  const game = Gameboard();
  game.placeShip(3, [0, 1, 2]);
  expect(game.receiveAttack(1, 1)).toEqual({
    length: 3,
    damage: 1,
    sunk: false,
  });
});

test("Receive attack: returns false when attacking empty coordinates", () => {
  const game = Gameboard();
  game.placeShip(3, [0, 1, 2]);
  expect(game.receiveAttack(3, 2)).toEqual(false);
});

test("Gameboard missed attacks: gameboard tracks all missed attacks", () => {
  const game = Gameboard();
  game.receiveAttack(1, 1);
  game.receiveAttack(2, 2);
  expect(game.missedShots.has(0)).toBe(true);
  expect(game.missedShots.has(11)).toBe(true);
});

test("Gameboard ships status: return true if no ships are present on the board", () => {
  const game = Gameboard();
  expect(game.allShipsDestroyed()).toBe(true);
});

test("Gameboard ships status: return false ships are present on the board", () => {
  const game = Gameboard();
  game.placeShip(2, [0, 1]);
  expect(game.allShipsDestroyed()).toBe(false);
});
