import React from "react";

const App = () => {
  const [matrix, setMatrix] = React.useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [char, setChar] = React.useState("x");
  const [win, setWin] = React.useState(false);

  const getBGClass = (value) => {
    return value === "x"
      ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
      : value === "o"
      ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
      : "bg-gray-200";
  };

  const handleClick = (row, col) => {
    if (!matrix[row][col] && !win) {
      const temp = [...matrix];
      temp[row][col] = char;
      setMatrix(temp);
      setChar(char === "x" ? "o" : "x");
      checkWinner(temp);
    }
  };

  const checkWinner = (matrix) => {
    const lines = [
      [matrix[0][0], matrix[0][1], matrix[0][2]],
      [matrix[1][0], matrix[1][1], matrix[1][2]],
      [matrix[2][0], matrix[2][1], matrix[2][2]],
      [matrix[0][0], matrix[1][0], matrix[2][0]],
      [matrix[0][1], matrix[1][1], matrix[2][1]],
      [matrix[0][2], matrix[1][2], matrix[2][2]],
      [matrix[0][0], matrix[1][1], matrix[2][2]],
      [matrix[0][2], matrix[1][1], matrix[2][0]],
    ];

    if (lines.some((line) => line.every((cell) => cell === char))) {
      setWin(true);
    }
  };

  const handleReset = () => {
    setMatrix([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setChar("x");
    setWin(false);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 min-h-screen p-8">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-6">Tic-Tac-Toe</h1>
      <div
        className={`text-3xl font-bold mb-6 ${win ? "text-yellow-500 animate-pulse" : "text-gray-700"}`}
      >
        {win ? `Player ${char === "x" ? "o" : "x"} Wins!` : `Turn: ${char}`}
      </div>
      <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-xl shadow-lg border border-gray-300">
        {matrix.map((row, rowi) =>
          row.map((cell, celli) => (
            <div
              onClick={() => handleClick(rowi, celli)}
              key={`${rowi}-${celli}`}
              className={`w-24 h-24 flex justify-center items-center text-6xl font-bold border-2 ${getBGClass(cell)} cursor-pointer transform hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg`}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <button
        onClick={handleReset}
        className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
      >
        Reset
      </button>
    </div>
  );
};

export default App;
