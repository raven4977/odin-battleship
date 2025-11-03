import {
  validate,
  getAvailableMoves,
  calculateNextMove,
  generateCoordinates,
} from "./utility.js";
import { render } from "./render.js";
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

class Player {
  constructor(playerType) {
    this.gameboard = Gameboard();
    this.player = playerType;
  }
}

const Gameboard = () => {
  const board = new Array(100).fill(null);
  const maxShips = {
    length1: 4,
    length2: 3,
    length3: 2,
    length4: 1,
  };
  const totalShips = {
    length1: 0,
    length2: 0,
    length3: 0,
    length4: 0,
  };
  const placedShips = new Set();
  const previousAttacks = new Set();
  const missedAttacks = new Set();
  const placeShip = (length, coordinates) => {
    const valid = validate.validateShipPlacement(
      length,
      coordinates,
      board,
      maxShips,
      totalShips
    );
    if (valid) {
      const ship = new Ship(length);
      ship.coordinates = coordinates;
      totalShips[`length${length}`]++;
      placedShips.add(ship);
      coordinates.forEach((coordinate) => (board[coordinate] = ship));
    }
  };

  const receiveAttack = (index) => {
    if (previousAttacks.has(index)) return;
    previousAttacks.add(index);
    if (board[index]) {
      const ship = board[index];
      ship.hit();
      return ship;
    }
    missedAttacks.add(index);
    return board[index];
  };

  const allShipsDestroyed = () => {
    return [...placedShips].every((ship) => ship.sunk);
  };

  const reset = () => {
    placedShips.forEach((ship) => {
      ship.damage = 0;
      ship.sunk = false;
    });
    missedAttacks.clear();
    previousAttacks.clear();
  };

  const randomizeBoard = (board) => {
    board.fill(null);
    placedShips.clear();
    totalShips.length1 = 0;
    totalShips.length2 = 0;
    totalShips.length3 = 0;
    totalShips.length4 = 0;
    const shipSizes = [
      { length: 4, amount: 1 },
      { length: 3, amount: 2 },
      { length: 2, amount: 3 },
      { length: 1, amount: 4 },
    ];

    for (const { length, amount } of shipSizes) {
      for (let i = 0; i < amount; i++) {
        const coordinates = generateCoordinates(
          length,
          board,
          maxShips,
          totalShips
        );

        if (!coordinates) {
          return randomizeBoard(board);
        }

        placeShip(length, coordinates);
      }
    }

    return true;
  };

  return {
    board,
    maxShips,
    totalShips,
    placeShip,
    receiveAttack,
    previousAttacks,
    missedAttacks,
    allShipsDestroyed,
    reset,
    randomizeBoard,
  };
};

const playGame = (() => {
  let gameStatus = false;
  let playerTurn = true;
  const getGameState = () => {
    return { gameStatus, playerTurn };
  };
  const startGame = () => {
    gameStatus = true;
  };
  const quitGame = () => {
    gameStatus = false;
    playerTurn = true;
  };
  const changeTurn = () => {
    playerTurn = !playerTurn;
  };
  const nextComputerMove = [];
  const computerMove = (player) => {
    const gameState = playGame.getGameState();
    if (gameState.playerTurn) return;
    const previousAttacks = player.gameboard.previousAttacks;
    const availableMoves = getAvailableMoves(previousAttacks);
    if (availableMoves.length === 0) return;
    const randomMove =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    if (nextComputerMove.length) {
      setTimeout(() => {
        let nextAttack = nextComputerMove[0][0];
        const attack = player.gameboard.receiveAttack(nextAttack);
        render.displayAttack(attack, nextAttack, player);
        if (attack) {
          if (attack.sunk) {
            nextComputerMove.length = 0;
            computerMove(player);
          } else {
            nextComputerMove[0].shift();
            if (!nextComputerMove[0].length) nextComputerMove.shift();
            computerMove(player);
          }
        } else {
          nextComputerMove.shift();
          playGame.changeTurn();
        }
      }, 2500);
      return;
    }
    setTimeout(() => {
      const attack = player.gameboard.receiveAttack(randomMove);
      render.displayAttack(attack, randomMove, player);
      if (attack) {
        if (!attack.sunk) {
          calculateNextMove(randomMove, nextComputerMove, previousAttacks);
          computerMove(player);
        } else {
          computerMove(player);
        }
      } else playGame.changeTurn();
    }, 1000);
  };
  return { getGameState, startGame, quitGame, changeTurn, computerMove };
})();

export { Ship, Gameboard, Player, playGame };
