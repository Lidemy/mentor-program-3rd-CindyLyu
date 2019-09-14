import React from 'react';
import './index.sass';
import GameBorder from './GameBorder.jsx';
import GameContent from './GameContent.jsx';


function App() {
  return (
    <main className="gomoku">
      <header className="gomoku__title">
        五子棋
        <i className="fas fa-circle" />
        <span><i className="gomoku__title-circle" /></span>
      </header>
      <GameBorder />
      <GameContent />
    </main>
  );
}


export default App;
