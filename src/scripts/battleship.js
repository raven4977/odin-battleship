class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.sunk = false;
    this.coordinates = [];
  }

  hit() {
    this.damage++;
    this.isSunk();
    return this;
  }

  isSunk() {
    if (this.damage === this.length) this.sunk = true;
    return this.sunk;
  }
}

export { Ship };
