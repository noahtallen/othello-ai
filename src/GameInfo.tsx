import * as React from 'react'
import { Puck } from './GameBoard'
import styled from 'styled-components'
import { OthelloCell } from './models'

type Props = {
    playerColor: OthelloCell
}

const GameInfo = ({ playerColor }: Props) => (
    <InfoContainer>
        <span>Your Color Is:</span>
        <Puck isWhite={playerColor === OthelloCell.White}/>
    </InfoContainer>
)

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 250px;
    align-items: center;
    font-weight: bold;
    margin-bottom: 20px;
`

export default GameInfo