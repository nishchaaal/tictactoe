const Player = (choice) => {
  const getChoice = () => choice;
  return { getChoice };
};

const Game = (() => {
  const player1 = Player("X");
  const player2 = Player("O");

  return { player1, player2 };
})();

const Board = (() => {
  const boxes = document.querySelectorAll(".box");
  const result = document.querySelector(".result");
  const restart = document.querySelector(".btn");
  let xTurn = true;
  let counter = 0;

  const winChecker = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const listener = (e) => {
    let currentClass = xTurn ? "X-class" : "O-class";

    if (xTurn) {
      e.target.textContent = Game.player1.getChoice();
      e.target.classList.add("X-class");
      xTurn = false;
      counter++;
    } else if (!xTurn) {
      e.target.textContent = Game.player2.getChoice();
      e.target.classList.add("O-class");
      xTurn = true;
      counter++;
    }

    if (checker(currentClass)) {
      if (!xTurn) {
        result.textContent = "Player1 (X) WINS !!!";
        boxes.forEach((box) => {
          box.removeEventListener("click", listener);
        });
      } else {
        result.textContent = "Player2 (O) WINS !!!";
        boxes.forEach((box) => {
          box.removeEventListener("click", listener);
        });
      }
    } else if (!checker(currentClass) && counter === 9) {
      console.log("DRAW");
    }
  };

  const checker = (current) => {
    return winChecker.some((combination) => {
      return combination.every((index) => {
        return boxes[index].classList.contains(current);
      });
    });
  };

  boxes.forEach((box) => {
    box.addEventListener("click", listener, { once: true });
  });

  restart.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("X-class");
      box.classList.remove("O-class");
    });
    boxes.forEach((box) => {
      box.addEventListener("click", listener, { once: true });
    });
    xTurn = true;
    counter = 0;
    result.textContent = "";
  });
})();
