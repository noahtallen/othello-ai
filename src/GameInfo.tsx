import * as React from 'react'
import { Puck } from './GameBoard'
import styled from 'styled-components'
import { Scores, ReversiCell, AIKind, InfoMessage } from './models'
import StartButton from './StartButton'

type Props = {
    playerColor: ReversiCell
    score: Scores
    currentTurn: ReversiCell
    aiKind: AIKind
    setIsPlaying: (isPlaying: boolean) => void
    messages: InfoMessage[]
}

const GameInfo = ({ playerColor, score, currentTurn, aiKind, setIsPlaying, messages }: Props) => {
    const goToStart = () => setIsPlaying(false)
    return (
        <InfoContainer>
            <Title>Score:</Title>
            <Pucks>
                <PuckScore
                    playerColor={playerColor}
                    score={score[ReversiCell.White]}
                    scoreColor={ReversiCell.White}
                    aiKind={aiKind}
                    hasTurn={currentTurn === ReversiCell.White}/>
                <PuckScore
                    playerColor={playerColor}
                    score={score[ReversiCell.Black]}
                    aiKind={aiKind}
                    scoreColor={ReversiCell.Black}
                    hasTurn={currentTurn === ReversiCell.Black}/>
            </Pucks>
            <StartButton onClick={goToStart}>Start Over</StartButton>
            <InfoMessages messages={messages}/>
        </InfoContainer>
    )
}

type PuckScore = {
    playerColor: ReversiCell
    score: number
    scoreColor: ReversiCell
    hasTurn: boolean
    aiKind: AIKind
}
export const PuckScore = ({ playerColor, score, scoreColor, hasTurn, aiKind }: PuckScore) => (
    <AbsolutePuckHolder showBorder={hasTurn}>
        <Puck isWhite={scoreColor === ReversiCell.White}/>
        <AbsoluteScore isWhite={scoreColor === ReversiCell.White}>{score}</AbsoluteScore>
        <PuckSubInfo>{
            aiKind === AIKind.Human ? playerColor === scoreColor ? '(Player 1)' : '(Player 2)'
            : playerColor === scoreColor ? '(You)' : '(AI)'
        }</PuckSubInfo>
    </AbsolutePuckHolder>
)

type MessagesProps = {
    messages: InfoMessage[]
}
export const InfoMessages = ({ messages }: MessagesProps) => (
    <Messages>
        {messages.map(({message, timestamp}, i) => (
            <Message key={timestamp.getTime()} isFirst={i === 0}>{message}</Message>
        ))}
    </Messages>
)


const Messages = styled.ul`
    padding-left: 10px;
    height: 230px;
    overflow-y: scroll;
    border: 1px solid gray;
`

type MessageProps = {
    isFirst: boolean
}
const Message = styled.li`
    list-style-type: none;
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${(props: MessageProps) => props.isFirst ? 'black' : 'gray'};
`

const Title = styled.h2`
    height: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 20px;
    margin-left: 10px;
    font-family: sans-serif;
`

const PuckSubInfo = styled.p`
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