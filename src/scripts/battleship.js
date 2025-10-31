class Ship {
  constructor(length) {
    this.length = length;
    this.damage = 0;
    this.sunk = false;
    this.coordinates = [];
  }
  hit() {
    this.damage++;
    return this;
  }
}

export { Ship };
