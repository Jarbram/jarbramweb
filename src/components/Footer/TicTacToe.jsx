import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GameContainer = styled.div`
  display: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  width: 180px;
  background: var(--background);
  padding: 2px;
  border-radius: 4px;
  z-index: 10;
  
  ${({ show }) => show && `
    display: grid;
  `}

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    transform: none;
    width: 150px;
    margin: 1rem 0;
  }
`;

const Cell = styled(motion.button)`
  aspect-ratio: 1;
  background: #1a1a1a;
  border: none;
  color: ${props => props.value === 'X' ? '#888' : '#666'};
  font-family: monospace;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #252525;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.isWinning ? '#50fa7b22' : 'transparent'};
    transition: background 0.3s ease;
  }

  ${props => props.isWinning && `
    color: ${props.value === 'X' ? '#50fa7b' : '#ff79c6'};
    animation: pulse 1s ease infinite;
  `}

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const GameStatus = styled(motion.div)`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: #888;
  font-size: 0.9rem;
  white-space: nowrap;
`;

const TicTacToe = ({ show, onGameEnd }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);
  const [status, setStatus] = useState('Your turn');
  const [winAnimation, setWinAnimation] = useState(false);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setWinAnimation(false);
    setStatus('Your turn');
  };

  const findBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove = null;
    
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        const boardCopy = [...currentBoard];
        boardCopy[i] = 'O';
        const score = minimax(boardCopy, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = calculateWinner(currentBoard);
    
    if (result?.winner === 'O') return 10 - depth;
    if (result?.winner === 'X') return depth - 10;
    if (currentBoard.every(cell => cell !== null)) return 0;
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currentBoard[i]) {
          const boardCopy = [...currentBoard];
          boardCopy[i] = 'O';
          const score = minimax(boardCopy, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!currentBoard[i]) {
          const boardCopy = [...currentBoard];
          boardCopy[i] = 'X';
          const score = minimax(boardCopy, depth + 1, true);
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)?.winner || !isXNext) return;
    
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
    setStatus('AI thinking...');

    // AI turn with delay
    setTimeout(() => {
      const bestMove = findBestMove(newBoard);
      if (bestMove !== null) {
        const finalBoard = [...newBoard];
        finalBoard[bestMove] = 'O';
        setBoard(finalBoard);
        setIsXNext(true);
        setStatus('Your turn');
      }
    }, 500);
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinningLine(result.line);
      setWinAnimation(true);
      setStatus(result.winner === 'X' ? 'You won!' : 'AI won!');
      
      if (onGameEnd) onGameEnd(result.winner);
      
      setTimeout(resetGame, 2000);
    } else if (board.every(cell => cell)) {
      setStatus("It's a draw!");
      setTimeout(resetGame, 1500);
    }
  }, [board]);

  return (
    <GameContainer show={show}>
      <GameStatus
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {status}
      </GameStatus>
      {board.map((cell, i) => (
        <Cell
          key={i}
          onClick={() => handleClick(i)}
          value={cell}
          isWinning={winningLine?.includes(i)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: winningLine?.includes(i) && winAnimation ? [1, 1.1, 1] : 1,
            opacity: 1,
            rotate: cell ? [0, 10, 0] : 0
          }}
          transition={{ 
            duration: 0.3,
            delay: i * 0.05
          }}
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 0.9 }}
        >
          {cell}
        </Cell>
      ))}
    </GameContainer>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
};

export default TicTacToe; 