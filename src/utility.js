export function checkValidity(length, coordinates) {
  if (length > 4 || length < 1) return false;
  for (let i = 0; i < coordinates.length; i++) {
    if (coordinates[i] < 0 || coordinates[i] > 99) return false;
  }
  if (length > coordinates.length || length < coordinates.length) return false;
  return true;
}
