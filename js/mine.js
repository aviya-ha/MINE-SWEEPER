'use strict'


function minesLocation(board, i , j) {
    console.log('i:', i)
    console.log('j:', j)
    var howManyMinesOnTheBoard = 0
        while (howManyMinesOnTheBoard < gLevel.mines) {
            var num1 = getRandomInt(0, gLevel.size)
            var num2 = getRandomInt(0, gLevel.size)
            if (!board[num1][num2].isMine && !(num1 === i && num2 === j)) {
                mineRandomLocation(board, num1, num2)
                howManyMinesOnTheBoard++
            }
    
    
        }
    }
    
    function mineRandomLocation(board, i, j) {
        board[i][j].isMine = true
    }
    
    function renderCell(cellI, cellJ, val) {
    const elCell = document.querySelector(`[data-i="${cellI}"][data-j="${cellJ}"]`)
    elCell.innerText = val
    return elCell
}