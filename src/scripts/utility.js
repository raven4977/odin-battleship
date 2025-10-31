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
  return { validateShipPlacement };
})();

export { validate };
