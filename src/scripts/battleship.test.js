const { Ship } = require("./battleship");

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
