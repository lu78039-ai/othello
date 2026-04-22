// js/board.js

class Board {
    constructor() {
        this.grid = Array(8).fill().map(() => Array(8).fill(EMPTY));
        this.setupInitialPieces();
    }

    setupInitialPieces() {
        this.grid[3][3] = WHITE;
        this.grid[3][4] = BLACK;
        this.grid[4][3] = BLACK;
        this.grid[4][4] = WHITE;
    }

    placePiece(row, col, player) {
        const flips = getFlips(this.grid, row, col, player);
        if (flips.length === 0) return false;

        this.grid[row][col] = player;
        for (const [r, c] of flips) {
            this.grid[r][c] = player;
        }
        return true;
    }

    isFull() {
        return !this.grid.some(row => row.includes(EMPTY));
    }
}
