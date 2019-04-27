export enum OthelloCell {
    Black,
    White,
    Empty,
}

export type OthelloBoard = OthelloCell[][]

export type Scores = {
    white: number,
    black: number
}