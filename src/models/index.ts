export enum ReversiCell {
    Black,
    White,
    Empty,
}

export type ReversiBoard = ReversiCell[][]

export type Scores = {
    white: number,
    black: number
}

export type Coordinate = {
    i: number,
    j: number
}

export type Direction = (coord: Coordinate) => Coordinate