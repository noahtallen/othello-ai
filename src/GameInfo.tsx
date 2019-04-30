import * as React from 'react'
import { Puck } from './GameBoard'
import styled from 'styled-components'
import { Scores, OthelloCell } from './models'

type Props = {
    playerColor: OthelloCell
    score: Scores
    currentTurn: OthelloCell
}

const GameInfo = ({ playerColor, score, currentTurn }: Props) => (
    <InfoContainer>
        <Title>Score:</Title>
        <Pucks>
            <PuckScore playerColor={playerColor} score={score.white} scoreColor={OthelloCell.White} hasTurn={currentTurn === OthelloCell.White}/>
            <PuckScore playerColor={playerColor} score={score.black} scoreColor={OthelloCell.Black} hasTurn={currentTurn === OthelloCell.Black}/>
        </Pucks>
    </InfoContainer>
)

type PuckScore = {
    playerColor: OthelloCell
    score: number
    scoreColor: OthelloCell
    hasTurn: boolean
}
const PuckScore = ({ playerColor, score, scoreColor, hasTurn }: PuckScore) => (
    <AbsolutePuckHolder showBorder={hasTurn}>
        <Puck isWhite={scoreColor === OthelloCell.White}/>
        <AbsoluteScore isWhite={scoreColor === OthelloCell.White}>{score}</AbsoluteScore>
        <PuckSubInfo>{playerColor === scoreColor ? '(You)' : '(AI)'}</PuckSubInfo>
    </AbsolutePuckHolder>
)

const Title = styled.h2`
    height: 20px;
    margin-top: 0px;
    margin-bottom: 15px;
    line-height: 20px;
    margin-left: 10px;
`

const PuckSubInfo = styled.p`
    font-size: 1.3em;
    text-align: center;
`
const Pucks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

type HolderProps = {
    showBorder: boolean
}
const AbsolutePuckHolder = styled.div`
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    position: relative;
    border: ${({ showBorder }: HolderProps) => showBorder ? '2px solid blue' : '2px solid transparent'};
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
    line-height: 100px;
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