const render = (() => {
  const renderBoard = (player) => {
    const board = player.gameboard.board;
    const playerType = player.player ? "player" : "computer";
    const boardElement = document.querySelector(`.${playerType}-board`);
    boardElement.textContent = "";
    board.forEach((square, index) => {
      const div = document.createElement("div");
      div.classList.add("square");
      if (playerType === "player") {
        if (square) {
          div.textContent = square.length;
          div.classList.add("ship");
        }
      }
      boardElement.appendChild(div);
    });
  };
  return { renderBoard };
})();

export { render };
