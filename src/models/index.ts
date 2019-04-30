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

export type Coordinate = {
    i: number,
    j: number
}

export type Direction = (coord: Coordinate) => Coordinate