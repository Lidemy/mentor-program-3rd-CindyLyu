import React from 'react';


function GameBorder() {
  return (
    <div className="gomoku__gameboard">
      <span className="gomoku__gameboard-outer" />
      <span className="gomoku__gameboard-horizontal" />
      <span className="gomoku__gameboard-horizontal two" />
      <span className="gomoku__gameboard-horizontal three" />
      <span className="gomoku__gameboard-horizontal four" />
      <span className="gomoku__gameboard-horizontal five" />
      <span className="gomoku__gameboard-horizontal six" />
      <span className="gomoku__gameboard-horizontal seven" />
      <span className="gomoku__gameboard-horizontal eight" />
      <span className="gomoku__gameboard-horizontal nine" />
      <span className="gomoku__gameboard-vertical" />
      <span className="gomoku__gameboard-vertical v-two" />
      <span className="gomoku__gameboard-vertical v-three" />
      <span className="gomoku__gameboard-vertical v-four" />
      <span className="gomoku__gameboard-vertical v-five" />
      <span className="gomoku__gameboard-vertical v-six" />
      <span className="gomoku__gameboard-vertical v-seven" />
      <span className="gomoku__gameboard-vertical v-eigth" />
      <span className="gomoku__gameboard-vertical v-nine" />
      <span className="gomoku__gameboard-vertical center" />
    </div>
  );
}


export default GameBorder;
