const express = require("express");
const app = express();

const toWin = "HAPPY";

app.get("/wordle/:guess", function (req, res) {
  const userGuess = req.params.guess.toUpperCase();
  let arr = ["", "", "", "", ""];
  let map = {
    H: 1,
    A: 1,
    P: 2,
    Y: 1,
  };

  for (let i = 0; i < userGuess.length; i++) {
    if (userGuess[i] === toWin[i]) {
      arr[i] = "green";
      let curLetter = userGuess[i];
      map[curLetter]--;
    }
  }
  for (let j = 0; j < userGuess.length; j++) {
    if (userGuess[j] !== toWin[j]) {
      let curLetter = userGuess[j];
      if (map[curLetter] === undefined) {
        arr[j] = "grey";
      } else if (map[curLetter] > 0) {
        arr[j] = "orange";
        map[curLetter]--;
      } else {
        arr[j] = "grey";
      }
    }
  }
  res.send(arr);
});

app.use(express.static("public"));

app.listen(3000);
