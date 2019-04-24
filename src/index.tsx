import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

const BOARD_SIZE = 8

type Props = {}

class App extends React.Component<Props> {
  render() {
    return (
      <Background>
        <Title>Welcome to Othello!</Title>
        <SubTitle>Current board size: {BOARD_SIZE}</SubTitle>
      </Background>
    )
  }
}

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
  background-color: #111111;
  width: 100vw;
  height: 100vh;
`

ReactDOM.render(<App />, document.getElementById("app"));