export function validate(length, coordinates, currentShips, maxShips, board) {
  const invalidPlacements = [-10, -11, -1, -9, 9, 10, 11, 1];
  const boardEndIndices = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
  if (length < 1 || length > 4) return false;
  // If statement ensures length is valid
  if (currentShips[`length${length}`] >= maxShips[`length${length}`])
    return false;
  //If statement checks shit limit
  if (length > coordinates.length || length < coordinates.length) return false;
  //If statement ensures that length is equal to total selected squares
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i] < 0 || coordinates[i] > 99) return false;
    // For loop checks out of bounds coordinates
  }

  if (coordinates.length > 1) {
    const initialDifference = Math.abs(coordinates[0] - coordinates[0 + 1]);
    if (initialDifference !== 10 && initialDifference !== 1) return false;
    for (let i = 0; i < coordinates.length - 1; i++) {
      if (Math.abs(coordinates[i] - coordinates[i + 1]) !== initialDifference)
        return false;
      // For loop ensures the difference is either 1 or 10 and remains a consistent value
    }
  }

  for (let index = 0; index < coordinates.length; index++) {
    if (board[coordinates[index]]) return false;
    // Loop checks if a ship already exists on selected coordinates
    for (let i = 0; i < invalidPlacements.length; i++) {
      if (board[coordinates[index] + invalidPlacements[i]]) return false;
    }
    // Loop checks if a ship exists around selected coordinates
  }

  const difference = Math.abs(coordinates[0] - coordinates[0 + 1]);
  if (difference == 1) {
    for (let i = 0; i < coordinates.length - 1; i++) {
      if (boardEndIndices.includes(coordinates[i])) return false;
      // For loop ensures ships can't wrap on the edge of the board
    }
  }

  return true;
}