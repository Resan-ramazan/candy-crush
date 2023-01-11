import blueCandy from "./images/blue-candy.png";
import greenCandy from "./images/green-candy.png";
import orangeCandy from "./images/orange-candy.png";
import purpleCandy from "./images/purple-candy.png";
import redCandy from "./images/red-candy.png";
import yellowCandy from "./images/yellow-candy.png";

import "./App.css";
import { useEffect, useState } from "react";

const width = 8;

const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([]);

  const checkColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] === "";

      if (
        columnOfFour.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        columnOfFour.forEach((square) => {
          currentColorArrangment[square] = "";
        });
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangment[i];
      const notValid =  [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentColorArrangment[i] === "";

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        rowOfFour.forEach((square) => {
          currentColorArrangment[square] = "";
        });
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] === "";

      if (
        columnOfThree.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        columnOfThree.forEach((square) => {
          currentColorArrangment[square] = "";
        });
      }
    }
  };
  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangment[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColorArrangment[i] === "";

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank
        )
      ) {
        rowOfThree.forEach((square) => {
          currentColorArrangment[square] = "";
        });
      }
    }
  };

  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangment.push(randomColor);
    }
    setCurrentColorArrangment(randomColorArrangment);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      setCurrentColorArrangment([...currentColorArrangment]);
    }, 100);
    return () => clearInterval(timer); // This is the cleanup function
  }, [checkColumnOfFour,checkForRowOfFour ,checkForColumnOfThree,checkForRowOfThree, currentColorArrangment]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
