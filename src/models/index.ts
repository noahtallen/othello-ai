export enum ReversiCell {
    Black,
    White,
    Empty,
}

export type ReversiBoard = ReversiCell[][]

export type Scores = {
    [kind: number /*ReversiCell*/]: number
}

export type Coordinate = {
    i: number,
    j: number
}

export type Direction = (coord: Coordinate) => Coordinate

export enum AIKind {
    Human,
    PickFirst,
    MinMaxTree,
    OnePly,
}

export enum HeuristicKind {
    PuckPairity
}

export type InfoMessage = {
    timestamp: Date,
    message: string
}