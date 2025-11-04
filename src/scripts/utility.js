const validate = (() => {
  const validateShipPlacement = (
    length,
    coordinates,
    board,
    maxShips,
    totalShips
  ) => {
    const boardEdge = [9, 19, 29, 39, 49, 59, 69, 79, 89];
    if (length < 1 || length > 4 || length !== coordinates.length) return false;

    if (totalShips[`length${length}`] >= maxShips[`length${length}`])
      return false;

    if (coordinates.length > 1) {
      const initialDifference = Math.abs(coordinates[0] - coordinates[1]);
      if (initialDifference !== 1 && initialDifference !== 10) return false;
      for (let i = 0; i < coordinates.length - 1; i++) {
        const coordinate = coordinates[i];
        const difference = Math.abs(coordinate - coordinates[i + 1]);
        if (initialDifference !== 10 && boardEdge.includes(coordinate))
          return false;
        if (difference !== initialDifference) return false;
      }
    }

    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i];
      if (coordinate < 0 || coordinate > 99) return false;
      if (board[coordinate]) return false;
    }
    return true;
  };

  const validateDragShip = (coordinates, board) => {
    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i];
      if (coordinate < 0 || coordinate > 99) return false;
      if (board[coordinate]) return false;
    }
    return true;
  };
  return { validateShipPlacement, validateDragShip };
})();

function updateDisplayMessage(element, message) {
  element.textContent = message;
}

function getAvailableMoves(previousAttacks) {
  const available = [];
  for (let i = 0; i < 100; i++) {
    if (!previousAttacks.has(i)) available.push(i);
  }
  return available;
}

function calculateNextMove(current, nextMoveArray, previousAttacks) {
  const edgeIndexRight = [9, 19, 29, 39, 49, 59, 69, 79, 89];
  const edgeIndexLeft = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const directions = [
    [1, 2, 3],
    [-1, -2, -3],
    [10, 20, 30],
    [-10, -20, -30],
  ];
  for (const arr of directions) {
    const validMoves = [];
    for (const value of arr) {
      const move = value + current;
      if (move < 0 || move > 99) continue;
      if (edgeIndexLeft.includes(current)) {
        const difference = Math.abs(current - move);
        if (difference !== 10) {
          if (move < current) continue;
        }
      }
      if (edgeIndexRight.includes(current)) {
        const difference = Math.abs(current - move);
        if (difference !== 10) {
          if (move > current) continue;
        }
      }
      if (previousAttacks.has(move)) continue;
      validMoves.push(move);
    }
    if (validMoves.length) nextMoveArray.push(validMoves);
  }
}

function generateCoordinates(length, board, maxShips, totalShips) {
  const possiblePlacements = [];

  for (let start = 0; start < 100; start++) {
    const row = Math.floor(start / 10);
    const col = start % 10;
    if (col + length <= 10) {
      const coords = [];
      for (let i = 0; i < length; i++) {
        coords.push(start + i);
      }
      possiblePlacements.push(coords);
    }

    if (col - length + 1 >= 0) {
      const coords = [];
      for (let i = 0; i < length; i++) {
        coords.push(start - i);
      }
      possiblePlacements.push(coords);
    }
    if (row + length <= 10) {
      const coords = [];
      for (let i = 0; i < length; i++) {
        coords.push(start + i * 10);
      }
      possiblePlacements.push(coords);
    }
    if (row - length + 1 >= 0) {
      const coords = [];
      for (let i = 0; i < length; i++) {
        coords.push(start - i * 10);
      }
      possiblePlacements.push(coords);
    }
  }
  shuffleArray(possiblePlacements);

  for (const coordinates of possiblePlacements) {
    const valid = validate.validateShipPlacement(
      length,
      coordinates,
      board,
      maxShips,
      totalShips
    );

    if (valid) {
      return coordinates;
    }
  }

  return null;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export {
  validate,
  updateDisplayMessage,
  getAvailableMoves,
  calculateNextMove,
  generateCoordinates,
};
