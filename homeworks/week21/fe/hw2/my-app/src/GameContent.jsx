import React, { Component } from 'react';


function decideResult(history, history2, player) {
  let resultCheck = [];
  for (let i = 0; i < history.length; i += 1) {
    if (history[i] !== null && history[i].indexOf(player) !== -1) {
      let index = history2[i].indexOf(player);
      const indices = [];
      while (index !== -1) { // 將陣列中含有該棋子的 index 儲存起來
        indices.push(index);
        index = history2[i].indexOf(player, index + 1);
      }
      resultCheck = [];
      for (let e = 0; e < indices.length; e += 1) {
        index = indices[e];
        // 檢查垂直直線連線
        for (let k = i; k < i + 5 && k < 20; k += 1) {
          if (history[k] && history[k + 1]) {
            if (history[k][index]) {
              if (history[k][index] === history[k + 1][index]) {
                resultCheck.push(true);
              }
            }
          }
        }
        if (resultCheck.length !== 4) {
          resultCheck = [];
          // 檢查水平直線連線
          for (let j = index; j < index + 5 && j < 20; j += 1) {
            if (history[i][j]) {
              if (history[i][j] === history[i][j + 1]) {
                resultCheck.push(true);
              }
            }
          }
        }
        if (resultCheck.length !== 4) {
          resultCheck = [];
          // 檢查左斜線（右下到左上檢查）
          for (let k = i, j = index; k > i - 5 && k > 0 && j > index - 5 && j > 0; k -= 1, j -= 1) {
            if (history[k] && history[k - 1]) {
              if (history[k][j]) {
                if (history[k][j] === history[k - 1][j - 1]) {
                  resultCheck.push(true);
                }
              }
            }
          }
        }
        if (resultCheck.length !== 4) {
          resultCheck = [];
          // 檢查右斜線（左下到右上檢查）
          for (let k = i,
            j = index; k > i - 5 && k < 20 && j < index + 5 && j < 20; k -= 1, j += 1) {
            if (history[k] && history[k - 1]) {
              if (history[k][j]) {
                if (history[k][j] === history[k - 1][j + 1]) {
                  resultCheck.push(true);
                }
              }
            }
          }
        }
        if (resultCheck.length === 4) {
          return true;
        }
      }
    }
  }
  return false;
}

class GameContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      piece: [],
      turn: true, // true 為輪到白子；false 輪到黑子
      winner: null,
      history: Array(19).fill(null),
    };
  }

  componentDidMount() {
    const { piece } = this.state;
    const positionX = [];
    const positionY = [];
    for (let x = -9; x <= 351; x += 20) { // 計算 X 座標位置
      positionX.push(x);
    }
    for (let y = -375; y <= -15; y += 20) { // 計算 Y 座標位置
      positionY.push(y);
    }
    for (let i = 1; i <= 19; i += 1) {
      for (let k = 1; k <= 19; k += 1) {
        const obj = {
          name: `gomoku__content-piece-L${k}-${i}`, x: positionX[i - 1], y: positionY[k - 1], ide: `L${k}${i}`, display: false, player: 'none',
        };
        piece.push(obj);
        this.setState({
          piece,
        });
      }
    }
  }

  handleContentChange(e) {
    const {
      turn, piece, winner, history,
    } = this.state;
    const black = '#666666';
    const player = turn ? 'white' : black;
    const className = e.target.getAttribute('class');
    const indentity = className.substr([className.indexOf('L') + 1]);
    const target = piece.filter(item => item.name === className);
    target[0].display = true; // 顯示該棋子

    if (winner === null && target[0].player === 'none') { // 尚未分出勝負且該位置無任何棋子時
      target[0].player = player;
      const firstNumber = indentity.substring(indentity, indentity.indexOf('-'));
      const lastNumber = indentity.substr([indentity.indexOf('-') + 1]);

      if (history[firstNumber - 1] === null) { // 是否有已存在的陣列
        const arr = Array(19).fill(null);
        arr[lastNumber - 1] = player;
        history[firstNumber - 1] = arr;
      } else {
        const arr = history[firstNumber - 1];
        arr[lastNumber - 1] = player;
        history[firstNumber - 1] = arr;
      }

      this.setState({
        piece,
        turn: !turn,
        history,
      });

      const result = decideResult(history, history, player);
      if (result) {
        this.setState({
          winner: player,
        });
      }
    }
  }

  render() {
    const { piece, winner, turn } = this.state;
    return (
      <div className="gomoku__content">
        {
          piece.map(item => (
            <button
              type="button"
              className={item.name}
              style={{
                opacity: item.display ? '1' : '0', top: item.y, left: item.x, background: item.player,
              }}
              key={item.name}
              onClick={this.handleContentChange.bind(this)}
            />
          ))
        }
        {
          winner ? (
            <div className="gomoku__content-result">
              <b>
              Winner：
                {winner === 'white' ? '白子' : '黑子'}
              </b>
              <div className="gomoku__content-tips">重新載入頁面即可開始新棋局</div>
            </div>
          ) : (
            <div className="gomoku__content-turn">
            輪到「
              <b>{turn ? '白子' : '黑子'}</b>
            」下棋
            </div>
          )
        }
      </div>
    );
  }
}


export default GameContent;
