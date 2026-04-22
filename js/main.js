// js/main.js

class OthelloUI {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.blackScoreEl = document.getElementById('black-score');
        this.whiteScoreEl = document.getElementById('white-score');
        
        // 分數面板容器
        this.blackBadge = document.querySelector('.black-badge');
        this.whiteBadge = document.querySelector('.white-badge');
        
        // 彈窗與按鈕
        this.overlay = document.getElementById('game-over-overlay');
        this.winnerTitle = document.getElementById('winner-title');
        this.resultText = document.getElementById('result-text');
        this.overlayResetBtn = document.getElementById('overlay-reset-btn');
        this.mainResetBtn = document.getElementById('reset-main-btn');

        this.initGame();
        this.setupEventListeners();
    }


    initGame() {
        this.board = new Board();
        this.currentPlayer = BLACK;
        this.gameOver = false;
        this.overlay.classList.remove('visible');
        this.render();
    }

    setupEventListeners() {
        this.mainResetBtn.onclick = () => this.initGame();
        this.overlayResetBtn.onclick = () => this.initGame();
        window.onkeydown = (e) => {
            if (e.key.toLowerCase() === 'r') this.initGame();
        };
    }

    handleCellClick(r, c) {
        if (this.gameOver) return;

        if (this.board.placePiece(r, c, this.currentPlayer)) {
            this.nextTurn();
        }
    }

    nextTurn() {
        const opponent = getOpponent(this.currentPlayer);
        const opponentMoves = getValidMoves(this.board.grid, opponent);

        if (opponentMoves.length > 0) {
            this.currentPlayer = opponent;
        } else {
            const playerMoves = getValidMoves(this.board.grid, this.currentPlayer);
            if (playerMoves.length === 0) {
                this.endGame();
            } else {
                // 跳過回合，維持 current player 不變 (或換成對方再換回來，這裡簡化為維持)
            }
        }
        this.render();
    }

    endGame() {
        this.gameOver = true;
        const { black, white } = countPieces(this.board.grid);
        
        if (black > white) {
            this.winnerTitle.textContent = "黑方獲勝！";
            this.winnerTitle.style.color = "#fbbf24";
        } else if (white > black) {
            this.winnerTitle.textContent = "白方獲勝！";
            this.winnerTitle.style.color = "#f8fafc";
        } else {
            this.winnerTitle.textContent = "平手！";
            this.winnerTitle.style.color = "#94a3b8";
        }

        this.resultText.textContent = `黑棋 ${black} : 白棋 ${white}`;
        this.overlay.classList.add('visible');
    }

    render() {
        this.boardElement.innerHTML = '';
        const validMoves = this.gameOver ? [] : getValidMoves(this.board.grid, this.currentPlayer);
        const { black, white } = countPieces(this.board.grid);

        this.blackScoreEl.textContent = black;
        this.whiteScoreEl.textContent = white;

        // 更新當前輪到的人的發光狀態
        if (this.currentPlayer === BLACK) {
            this.blackBadge.classList.add('active-turn');
            this.whiteBadge.classList.remove('active-turn');
        } else {
            this.whiteBadge.classList.add('active-turn');
            this.blackBadge.classList.remove('active-turn');
        }

        // 如果遊戲結束，取消所有發光
        if (this.gameOver) {
            this.blackBadge.classList.remove('active-turn');
            this.whiteBadge.classList.remove('active-turn');
        }

        for (let r = 0; r < 8; r++) {

            for (let c = 0; c < 8; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                
                const pieceType = this.board.grid[r][c];
                if (pieceType !== EMPTY) {
                    const piece = document.createElement('div');
                    piece.className = `piece ${pieceType === BLACK ? 'black' : 'white'}`;
                    cell.appendChild(piece);
                } else if (validMoves.some(m => m[0] === r && m[1] === c)) {
                    cell.classList.add('hint');
                }

                cell.onclick = () => this.handleCellClick(r, c);
                this.boardElement.appendChild(cell);
            }
        }
    }
}

new OthelloUI();
