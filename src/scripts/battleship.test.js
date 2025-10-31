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
