import * as React from 'react'
import { Puck } from './GameBoard'
import styled from 'styled-components'
import { Scores, ReversiCell, AIKind } from './models'

type Props = {
    playerColor: ReversiCell
    score: Scores
    currentTurn: ReversiCell
    aiKind: AIKind
    setAIKind(kind: AIKind): void
}

const AIKindNames: { [kind: number]: string } = {
    [AIKind.PickFirst]: "Make First Available Move",
}

const GameInfo = ({ playerColor, score, currentTurn, aiKind, setAIKind }: Props) => (
    <InfoContainer>
        <Title>AI:</Title>
        <AIKindPicker selected={aiKind} setAIKind={setAIKind} />
        <Title>Score:</Title>
        <Pucks>
            <PuckScore playerColor={playerColor} score={score.white} scoreColor={ReversiCell.White} hasTurn={currentTurn === ReversiCell.White}/>
            <PuckScore playerColor={playerColor} score={score.black} scoreColor={ReversiCell.Black} hasTurn={currentTurn === ReversiCell.Black}/>
        </Pucks>
    </InfoContainer>
)

const AIKindPicker = (props: { selected: AIKind, setAIKind(kind: AIKind): void }) => {
    var options = Object.keys(AIKind)
        .filter(key => !isNaN(Number(key)))
        .map((key: any) =>
            <option key={key} value={key}>{AIKindNames[key] || AIKind[key]}</option>
        )

    return (
        <AIKindDropdown
            onChange={val => props.setAIKind(val.target.selectedIndex as AIKind)}
            value={props.selected}>{options}</select>
    )
}

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

const AIKindDropdown = styled.select`
    font-size: 14px;
    margin: 0 10px 10px 10px;
`

const AIKindContainer = styled.div`
    font-style: italic;
    padding: 10px;
    padding-top: 0;
`

const Title = styled.h2`
    height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 20px;
    margin-left: 10px;
`

const PuckSubInfo = styled.p`
    font-size: 1.3em;
    text-align: center;
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