const { Ship } = require("./battleship.js");

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
