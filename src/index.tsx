import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import GameContainer from './GameContainer';
import ErrorBoundary from './ErrorBoundary';
import { ReversiCell } from './models';

const App = () => {
  // NOTE: This must be an even number so that
  // the starting tiles can be generated accordingly:
  const [boardSize, setBoardSize] = React.useState(8)
  const [playerColor, setPlayerColor] = React.useState(ReversiCell.White)
  const [isPlaying, setIsPlaying] = React.useState(false)
  
  const startGame = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
  }

  if (isPlaying) {
    return (
      <Background>
      <ErrorBoundary>
        <GameContainer boardSize={boardSize} playerColor={playerColor}/>
      </ErrorBoundary>
      </Background>
    )
  } else {
    return (
      <Background>
      <StartArea>
        <MainTitle>Welcome to Reversi</MainTitle>
        <StartButton onClick={startGame}>Start a Game</StartButton>
      </StartArea>
      </Background>
    )
  }
}

const MainTitle = styled.h1`
  margin-bottom: 50px;
`
const StartArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

`
const StartButton = styled.button`
    width: 200px;
    cursor: pointer;
    height: 60px;
    border-radius: 4px;
    background-color: black;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
    border: none;
    font-weight: bold;
    color: white;
    font-size: 1.4em;
    &:hover {
        background-color: gray;
    }
`

const Background = styled.div`
  background-color: white;
`

ReactDOM.render(<App />, document.getElementById("app"));