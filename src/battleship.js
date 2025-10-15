class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.sunk = false;
  }
  hit() {
    this.damage++;
    return this;
  }
}

module.exports = {
  Ship,
};

/* 
Battleship Logic:
1. 2 10x10 boards
2.1 Both players must have 4 ships of length 1, 3 ships of length 2, 2 ships of length 3, 1 ship of length 4, phase 1 starts with players placing ships
2.2 Ship placement must be at least 1 square apart
3. Consider building a computer enemy
4. Player 1 goes first, if player hits an enemy ship then players goes again, if player misses players swap turns, if player selects the same square return before anything happens
5. Players win when all enemy ships are destroyed
*/
