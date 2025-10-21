const { Ship } = require("./battleship");

test("Create a ship object", () => {
  expect(new Ship(4)).toEqual({
    length: 4,
    damage: 0,
    sunk: false,
  });
});
