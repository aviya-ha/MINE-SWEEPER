'use strict'


function minesLocation(board ,indexI, indexJ) {
    var count = 0
    while(count !== gLevel.mines){
        const numI = getRandomInt(0,gLevel.size) 
        const numJ = getRandomInt(0,gLevel.size) 
        if(!board[numI][numJ].isMine && (numI !== indexI && numJ !== indexJ)){
            board[numI][numJ].isMine = true
            count++
        }
    }
    }
    
    function mineRandomLocation(board, i, j) {
        board[i][j].isMine = true
    }
    
    function setMinesNegsCount(board) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (!board[i][j].isMine) {
                    var minesCount = countMinesAround(board, i, j)
                    board[i][j].minesAroundCount = minesCount
                }
            }
        }
    
    }
    
    function countMinesAround(board, cellI, cellJ) {
        var count = 0
    
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= board.length) continue
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (i === cellI && j === cellJ) continue
                if (j < 0 || j >= board[i].length) continue
                if (board[i][j].isMine) count++
            }
        }
        return count
    }