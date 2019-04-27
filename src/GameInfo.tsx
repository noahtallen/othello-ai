import * as React from 'react'
import { Puck } from './GameBoard'
import styled from 'styled-components'
import { Scores, OthelloCell } from './models'

type Props = {
    playerColor: OthelloCell,
    score: Scores
}

const GameInfo = ({ playerColor, score }: Props) => (
    <InfoContainer>
        <h2>Score:</h2>
        <Pucks>
            <PuckScore playerColor={playerColor} score={score.white} scoreColor={OthelloCell.White}/>
            <PuckScore playerColor={playerColor} score={score.black} scoreColor={OthelloCell.Black}/>
        </Pucks>
    </InfoContainer>
)

type PuckScore = {
    playerColor: OthelloCell
    score: number
    scoreColor: OthelloCell
}
const PuckScore = ({ playerColor, score, scoreColor}: PuckScore) => (
    <AbsolutePuckHolder>
        <Puck isWhite={scoreColor === OthelloCell.White}/>
        <AbsoluteScore isWhite={scoreColor === OthelloCell.White}>{score}</AbsoluteScore>
        <PuckSubInfo>{playerColor === scoreColor ? '(You)' : '(AI)'}</PuckSubInfo>
    </AbsolutePuckHolder>
)

const PuckSubInfo = styled.p`
    font-size: 1.3em;
    text-align: center;
`
const Pucks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const AbsolutePuckHolder = styled.div`
    flex: 1;
    margin: 10px;
    position: relative;
`
type ScoreProps = {
    isWhite: boolean
}
const AbsoluteScore = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    line-height: 80px;
    font-size: 1.7em;
    color: ${({isWhite}: ScoreProps) => isWhite ? 'black' : 'white' };
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    justify-content: flex-start;
    font-weight: bold;
    margin-right: 30px;
    align-self: flex-start;
`

export default GameInfo