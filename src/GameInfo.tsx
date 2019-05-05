import * as React from 'react'
import { Puck } from './GameBoard'
import styled from 'styled-components'
import { Scores, ReversiCell } from './models'

type Props = {
    playerColor: ReversiCell
    score: Scores
    currentTurn: ReversiCell
}

const GameInfo = ({ playerColor, score, currentTurn }: Props) => (
    <InfoContainer>
        <Title>Score:</Title>
        <Pucks>
            <PuckScore playerColor={playerColor} score={score.white} scoreColor={ReversiCell.White} hasTurn={currentTurn === ReversiCell.White}/>
            <PuckScore playerColor={playerColor} score={score.black} scoreColor={ReversiCell.Black} hasTurn={currentTurn === ReversiCell.Black}/>
        </Pucks>
    </InfoContainer>
)

type PuckScore = {
    playerColor: ReversiCell
    score: number
    scoreColor: ReversiCell
    hasTurn: boolean
}
export const PuckScore = ({ playerColor, score, scoreColor, hasTurn }: PuckScore) => (
    <AbsolutePuckHolder showBorder={hasTurn}>
        <Puck isWhite={scoreColor === ReversiCell.White}/>
        <AbsoluteScore isWhite={scoreColor === ReversiCell.White}>{score}</AbsoluteScore>
        <PuckSubInfo>{playerColor === scoreColor ? '(You)' : '(AI)'}</PuckSubInfo>
    </AbsolutePuckHolder>
)

const Title = styled.h2`
    height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 20px;
    margin-left: 10px;
`

const PuckSubInfo = styled.p`
    font-size: 1.3em;
    margin-bottom: 0;
    text-align: center;
    font-weight: normal;
`
export const Pucks = styled.div`
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
    line-height: 70px;
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

    @media (max-width: 900px) {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }
`

export default GameInfo