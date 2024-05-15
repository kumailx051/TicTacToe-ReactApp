import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const titleRef = useRef(null);
  const player1Ref = useRef(null);
  const player2Ref = useRef(null);

  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);
  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (data[num] === "") {
      if (count % 2 === 0) {
        e.target.innerHTML = `<img src='${cross_icon}'>`;
        data[num] = "x";
      } else {
        e.target.innerHTML = `<img src='${circle_icon}'>`;
        data[num] = "o";
      }
      setCount(count + 1);
      checkWin();
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
    }
  };

  const checkWin = () => {
    // Winning conditions
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }

    // If all boxes are filled and no one wins
    if (count === 9) {
      setLock(true);
      titleRef.current.innerHTML = `It's a draw!`;
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations ${currentPlayer} wins!`;
  };

  const reset = () => {
    setLock(false);
    setCurrentPlayer(player1);
    setCount(0);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = 'Tic Tac Toe In <span>React</span>';
    box_array.map((e) => {
      e.current.innerHTML = "";
    });
  };

  const handlePlayerDetailsSubmit = (e) => {
    e.preventDefault();
    setPlayer1(player1Ref.current.value || 'Player 1');
    setPlayer2(player2Ref.current.value || 'Player 2');
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span> React </span></h1>

      {!player1 && !player2 && (
        <form onSubmit={handlePlayerDetailsSubmit}>
          <label>
            Player 1:   
            <input type="text" ref={player1Ref} />
          </label>
          <label>
            Player 2:    
            <input type="text" ref={player2Ref} />
          </label>
          <button type="submit">Start Game</button>
        </form>
      )}

      {player1 && player2 && (
        <>
          <h2>Current Player: {currentPlayer}</h2>
          <div className='board'>
            <div className='row1'>
              {box_array.slice(0, 3).map((box, index) => (
                <div key={index} className='boxes' ref={box} onClick={(e) => { toggle(e, index) }}></div>
              ))}
            </div>
            <div className='row2'>
              {box_array.slice(3, 6).map((box, index) => (
                <div key={index + 3} className='boxes' ref={box} onClick={(e) => { toggle(e, index + 3) }}></div>
              ))}
            </div>
            <div className='row3'>
              {box_array.slice(6, 9).map((box, index) => (
                <div key={index + 6} className='boxes' ref={box} onClick={(e) => { toggle(e, index + 6) }}></div>
              ))}
            </div>
          </div>

        

          <button className="reset" onClick={reset}>
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
