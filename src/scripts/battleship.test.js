const { Ship, Gameboard } = require("./battleship.js");
const { validate } = require("./utility.js");

test("Ship:  create a ship object with a length of 1", () => {
  expect(new Ship(1)).toEqual({
    length: 1,
    damage: 0,
    sunk: false,
    coordinates: [],
  });
});

test("Ship: create a ship object with a length of 2", () => {
  expect(new Ship(2)).toEqual({
    length: 2,
    damage: 0,
    sunk: false,
    coordinates: [],
  });
});

test("hit: increment ship object damage by one", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship).toEqual({ length: 3, damage: 1, sunk: false, coordinates: [] });
});

test("hit: increment ship object damage by two", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship).toEqual({ length: 3, damage: 2, sunk: false, coordinates: [] });
});

test("isSunk: returns true if a ship is sunk", () => {
  const ship = new Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("isSunk method: returns false if a ship isn't sunk", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test("validateShipPlacement: rejects when length and coordinates.length do not match", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      1,
      [0, 1, 2],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: rejects when length is invalid", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      5,
      [0, 1, 2, 3],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: accepts a vertically placed ship", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      4,
      [0, 10, 20, 30],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(true);
});

test("validateShipPlacement: accepts horizontally placed ship", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      4,
      [0, 1, 2, 3],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(true);
});

test("validateShipPlacement: rejects when a ship has reached it maximum limit", () => {
  const game = Gameboard();
  game.placeShip(4, [0, 10, 20, 30]);
  game.placeShip(4, [1, 2, 3, 4]);
  expect(
    validate.validateShipPlacement(
      4,
      [5, 6, 7, 8],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: rejects when ships overlap", () => {
  const game = Gameboard();
  game.placeShip(4, [1, 2, 3, 4]);
  expect(
    validate.validateShipPlacement(
      2,
      [4, 5],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: rejects when coordinates are invalid", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      2,
      [-1, 0],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
  expect(
    validate.validateShipPlacement(
      2,
      [99, 100],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: rejects when coordinate difference is not consistent", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      3,
      [1, 2, 12],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: rejects coordinate wrapping", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      3,
      [8, 9, 10],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: accepts ships placed on the edge of the board", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      3,
      [7, 8, 9],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(true);
});

test("validateShipPlacement: accepts ship of length 1", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      1,
      [50],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(true);
});

test("validateShipPlacement: rejects diagonal ship placement", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      3,
      [0, 11, 22],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: rejects when coordinate difference is invalid", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      2,
      [0, 2],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(false);
});

test("validateShipPlacement: accepts vertical ship at bottom edge", () => {
  const game = Gameboard();
  expect(
    validate.validateShipPlacement(
      3,
      [70, 80, 90],
      game.board,
      game.maxShips,
      game.totalShips
    )
  ).toBe(true);
});
