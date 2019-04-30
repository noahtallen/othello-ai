import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import GameContainer from './GameContainer';
import ErrorBoundary from './ErrorBoundary';
import { OthelloCell } from './models';


const App = () => {
  // NOTE: This must be an even number so that
  // the starting tiles can be generated accordingly:
  const [boardSize, setBoardSize] = React.useState(8)
  const [playerColor, setPlayerColor] = React.useState(OthelloCell.White)
  return (
    <Background>
    <ErrorBoundary>
      <GameContainer boardSize={boardSize} playerColor={playerColor}/>
    </ErrorBoundary>
  </Background>
  )
}

const Background = styled.div`
  background-color: white;
`

ReactDOM.render(<App />, document.getElementById("app"));