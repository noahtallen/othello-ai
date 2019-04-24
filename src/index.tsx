import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import GameContainer from './GameContainer';
import ErrorBoundary from './ErrorBoundary';

// NOTE: This must be an even number so that
// the starting tiles can be generated accordingly.
const BOARD_SIZE = 8

const App = () => (
  <Background>
    <Title>Welcome to Othello!</Title>
    <SubTitle>Current board size: {BOARD_SIZE}x{BOARD_SIZE}</SubTitle>
    <ErrorBoundary>
      <GameContainer boardSize={BOARD_SIZE} />
    </ErrorBoundary>
  </Background>
)

const Title = styled.h2`
  margin: 0;
  padding: 20px;
  padding-bottom: 0;
`
const SubTitle = styled.h4`
  padding-left: 20px;
  color: gray;
`
const Background = styled.div`
  background-color: white;
`

ReactDOM.render(<App />, document.getElementById("app"));