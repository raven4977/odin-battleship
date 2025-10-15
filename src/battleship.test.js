const { Ship } = require("./battleship");

test("Ship class => length: 2, damage: 0, sunk: false", () => {
  const ship = new Ship(2);
  expect(ship).toEqual({ length: 2, damage: 0, sunk: false });
});

test("Ship class => length: 3, damage: 0, sunk: false", () => {
  const ship = new Ship(3);
  expect(ship).toEqual({ length: 3, damage: 0, sunk: false });
});

test("Hit method => length: 3, damage: 1, sunk: false", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship).toEqual({ length: 3, damage: 1, sunk: false });
});

test("Hit method => length: 3, damage: 2, sunk: false", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  expect(ship).toEqual({ length: 3, damage: 2, sunk: false });
});
