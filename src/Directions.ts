import { Direction, Coordinate } from './models'

/*
    These functions increment i/j such that one can iterate through
    the cells on a board. You can go forward, backward, diagonally,
    etc. This helps us search the board from an originating cell.
    We use them to 
*/


const directions: Array<Direction> = [
    // increment i, keep j the same
    ({ i, j }: Coordinate) => ( { i: i + 1, j } ),
    // decrement i, keep j the same
    ({ i, j }: Coordinate) => ( { i: i - 1, j } ),
    // increment j, keep i the same
    ({ i, j }: Coordinate) => ( {i, j: j + 1 } ),
    // decrement j, keep i the same
    ({ i, j }: Coordinate) => ( { i, j: j - 1 } ),
    // increment i and j
    ({ i, j }: Coordinate) => ( { i: i + 1, j: j + 1 } ),
    // decrement i and j
    ({ i, j }: Coordinate) => ( { i: i - 1, j: j - 1 } ),
    // increment i, decrement j
    ({ i, j }: Coordinate) => ( { i: i + 1, j: j - 1 } ),
    // decrement i, increment j
    ({ i, j }: Coordinate) => ( { i: i - 1, j: j + 1 } ),
]

export default directions