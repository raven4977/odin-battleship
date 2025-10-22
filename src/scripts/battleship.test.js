const { Ship, Gameboard } = require("./battleship");
const { validate } = require("./utility");

test("Create a ship object", () => {
  expect(new Ship(4)).toEqual({
    length: 4,
    damage: 0,
    sunk: false,
  });
});

test("Increment the damage of a ship object", () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.damage).toBe(1);
});

test("Update ship object sunk boolean to true", () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Ship object sunk boolean remains false", () => {
  const ship = new Ship(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("Ship length is valid", () => {
  const game = Gameboard();
  expect(
    validate(3, [1, 2, 3], game.currentShips, game.maxShips, game.board)
  ).toBe(true);
});

test("Ship length is invalid", () => {
  const game = Gameboard();
  expect(
    validate(5, [1, 2, 3, 4], game.currentShips, game.maxShips, game.board)
  ).toBe(false);
});

test("Coordinates contain invalid values", () => {
  const game = Gameboard();
  expect(
    validate(4, [-1, 2, 3, 4], game.currentShips, game.maxShips, game.board)
  ).toBe(false);
});

test("Coordinates are valid", () => {
  const game = Gameboard();
  expect(
    validate(4, [10, 11, 12, 13], game.currentShips, game.maxShips, game.board)
  ).toBe(true);
});

test("Place a ship on the board", () => {
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

test("Place a ship on the board", () => {
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

test("Fail to place a second ship within the boundaries of the first", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(4, [0, 1, 2, 3]);
  game.placeShip(3, [4, 5, 6]);
  expect(board.slice(4, 7)).toEqual([false, false, false]);
});

test("Successfully place a second ship on the board", () => {
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

test("Fail to place ships that have reached their maximum limit", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(4, [0, 1, 2, 3]);
  game.placeShip(4, [5, 6, 7, 8]);
  expect(board.slice(5, 9)).toEqual([false, false, false, false]);
});

test("Fail to place ships if length and coordinates do not match", () => {
  const game = Gameboard();
  const board = game.board;
  game.placeShip(3, [0, 1, 2, 3]);
  expect(board.slice(0, 4)).toEqual([false, false, false, false]);
});

test("Return true if coordinates do not wrap onto a new line", () => {
  const game = Gameboard();
  expect(
    validate(2, [8, 9], game.currentShips, game.maxShips, game.board)
  ).toBe(true);
});

test("Return false if coordinates wrap onto a new line", () => {
  const game = Gameboard();
  expect(
    validate(2, [9, 10], game.currentShips, game.maxShips, game.board)
  ).toBe(false);
});

test("Return true when placing a ship vertically on the edge of the board", () => {
  const game = Gameboard();
  expect(
    validate(3, [9, 19, 29], game.currentShips, game.maxShips, game.board)
  ).toBe(true);
});
