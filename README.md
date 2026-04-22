# Othello - Antigravity Edition

這是一個具備雙版本（Web & Python）的經典黑白棋（Othello/Reversi）遊戲。

## 🚀 網頁即刻玩
**[在此點擊開始遊戲](https://你的使用者名稱.github.io/你的倉庫名稱/)**
*(請在 GitHub 專案設定中開啟 Settings > Pages 並將來源設為 main 分支)*

## 遊戲特色
- **純網頁執行**：採用 HTML5/JS 實作，無需安裝環境即可在瀏覽器遊玩。
- **經典規則**：完整實作 8x8 棋盤、初始交叉落子以及 8 方向翻轉邏輯。
- **Premium 視覺**：採用 Slate/Emerald 質感設計與平滑的棋盤動畫。
- **落子提示**：自動標示合法落子位，提升思考流暢度。

## 目錄結構
```
othello-antigravity/
├── index.html          # Web 版入口
├── css/                # 介面設計系統 (Premium Dark Mode)
├── js/                 # 遊戲邏輯與 UI 控制
├── .github/workflows/  # 自動部署至 GitHub Pages 的腳本
├── core/               # Python (Pygame) 版邏輯
├── main.py             # Python 版主入口
└── README.md
```

## 安裝與執行

1. **安裝依賴套件**：
   ```bash
   pip install -r requirements.txt
   ```

2. **啟動遊戲**：
   ```bash
   python main.py
   ```

## 操控說明
- **滑鼠左鍵**：在標示有提示的小圓點處點擊落子。
- **R 鍵**：重新開始遊戲。
- **視窗關閉**：退出遊戲。
