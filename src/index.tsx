import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import GameContainer from './GameContainer';
import ErrorBoundary from './ErrorBoundary';
import { ReversiCell, AIKind } from './models';

const AIKindNames: { [kind: number]: string } = {
  [AIKind.PickFirst]: "Make First Available Move",
  [AIKind.MinMaxTree]: "Min Max Tree",
  [AIKind.Human]: "Human",
}

const App = () => {
  // NOTE: This must be an even number so that
  // the starting tiles can be generated accordingly:
  const [boardSize, setBoardSize] = React.useState(8)
  const [playerColor, setPlayerColor] = React.useState(ReversiCell.White)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [aiKind, setAIKind] = React.useState<AIKind>(AIKind.PickFirst)

  const startGame = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
  }

  if (isPlaying) {
    return (
      <Background>
      <ErrorBoundary>
        <GameContainer boardSize={boardSize} playerColor={playerColor} aiKind={aiKind}/>
      </ErrorBoundary>
      </Background>
    )
  } else {
    return (
      <Background>
      <StartArea>
        <MainTitle>Welcome to Reversi</MainTitle>
        <h2>AI:</h2>
        <AIKindPicker selected={aiKind} setAIKind={setAIKind} />
        <StartButton onClick={startGame}>Start a Game</StartButton>
      </StartArea>
      </Background>
    )
  }
}

const AIKindPicker = (props: { selected: AIKind, setAIKind(kind: AIKind): void }) => {
  var options = Object.keys(AIKind)
      .filter(key => !isNaN(Number(key)))
      .map((key: any) =>
          <option key={key} value={key}>{AIKindNames[key] || AIKind[key]}</option>
      )

  return (
      <AIKindDropdown
          onChange={val => props.setAIKind(val.target.selectedIndex as AIKind)}
          value={props.selected}>{options}</AIKindDropdown>
  )
}

const AIKindDropdown = styled.select`
    font-size: 14px;
    margin: 0 10px 10px 10px;
`

const AIKindContainer = styled.div`
    font-style: italic;
    padding: 10px;
    padding-top: 0;
`

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