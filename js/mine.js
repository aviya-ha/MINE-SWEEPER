'use strict'


function minesLocation(board) {
    var howManyMinesOnTheBoard = 0
        while (howManyMinesOnTheBoard < gLevel.mines) {
            var num1 = getRandomInt(0, gLevel.size)
            var num2 = getRandomInt(0, gLevel.size)
            if (!board[num1][num2].isMine) {
                mineRandomLocation(board, num1, num2)
                howManyMinesOnTheBoard++
            }
    
    
        }
    }
    
    function mineRandomLocation(board, i, j) {
        board[i][j].isMine = true
    }
    