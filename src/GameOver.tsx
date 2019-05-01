import * as React from 'react'
import { PuckScore, Pucks } from './GameInfo'
import styled from 'styled-components'
import { Scores, ReversiCell } from './models'

type Props = {
    playerColor: ReversiCell
    score: Scores
}

const GameOver = ({ score, playerColor }: Props) => {
    const didWin = playerColor === ReversiCell.Black ? score.black >= score.white : score.white > score.black
    return (
        <Overlay>
            <h1>Game Over</h1>
            <h1>{didWin ? 'You won' : 'You lost'}</h1>
        </Overlay>
    )
}

const Overlay = styled.div`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
`
export default GameOver
