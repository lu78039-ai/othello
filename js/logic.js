// js/logic.js

const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

function getOpponent(player) {
    return 3 - player;
}

function isOnBoard(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function getFlips(grid, row, col, player) {
    if (grid[row][col] !== EMPTY) return [];

    const opponent = getOpponent(player);
    const flips = [];
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        const path = [];

        while (isOnBoard(r, c) && grid[r][c] === opponent) {
            path.push([r, c]);
            r += dr;
            c += dc;
        }

        if (isOnBoard(r, c) && grid[r][c] === player) {
            flips.push(...path);
        }
    }

    return flips;
}

function getValidMoves(grid, player) {
    const validMoves = [];
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            if (getFlips(grid, r, c, player).length > 0) {
                validMoves.push([r, c]);
            }
        }
    }
    return validMoves;
}

function countPieces(grid) {
    let black = 0;
    let white = 0;
    for (const row of grid) {
        for (const cell of row) {
            if (cell === BLACK) black++;
            else if (cell === WHITE) white++;
        }
    }
    return { black, white };
}
