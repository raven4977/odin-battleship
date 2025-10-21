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
