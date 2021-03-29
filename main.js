//import {Storage} from './storage';
var SudokuGame = /** @class */function () {
    function SudokuGame() {
        this.used = [];
        this.shiftRows = [];
        this.validBoard = false;
        this.ts = 0;
        this.storage = new Storage();
        this.reset();
    }
    SudokuGame.prototype.reset = function () {
        this.ts = Date.now();
        this.board = [];
        this.solvedBoard = [];
        this.used = [];
        this.shiftRows = [];
        this.validBoard = false;
        this.boardEl = document.getElementsByClassName('sudoku')[0];
        this.generateBoard();
        var self = this;
        setInterval(function () {
            self.update();
        }, 1000);
    };
    SudokuGame.prototype.generateBoard = function () {
        var html = '';
        for (var y = 0; y < 9; y++) {
            html += '<tr class="' + y + '">';
            this.board[y] = [];
            for (var x = 0; x < 9; x++) {
                html += '<td class="' + x + '"><input type="text" class="' + y + '-' + x + '"/></td>';
                this.board[y][x] = 0;
            }
            html += '</tr>';
        }
        this.boardEl.innerHTML = html;
        var loadedData = this.storage.load();
        var validLoadData = false;
        if (loadedData) {
            var data = JSON.parse(loadedData);
            console.log(data);
            if (data.board && data.solvedBoard) {
                validLoadData = true;
                this.board = data.board.map(function (x) {
                    return x;
                });
                this.solvedBoard = data.solvedBoard.map(function (x) {
                    return x;
                });
            }
        }
        if (!validLoadData) {
            this.generatePresetValues();
        }
        this.updateBoard();
    };
    SudokuGame.prototype.generatePresetValues = function () {
        var r1 = 3;
        var r2 = 1;
        for (var y = 0; y < 9; y++) {
            if (y == 1 || y == 2 || y == 4 || y == 5 || y == 7 || y == 8) {
                this.shiftRows[y] = r1;
            } else if (y > 0) {
                this.shiftRows[y] = r2;
            }
            for (var x = 0; x < 9; x++) {
                this.solverCheck(y, x);
            }
        }
        this.solvedBoard = JSON.parse(JSON.stringify(this.board));
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var chance = Math.random();
                if (chance < .1) {
                    this.board[y][x] = 0;
                }
            }
        }
        // randomize rows
        var shiftRounds = 3;
        var self = this;
        for (var i = 0; i < shiftRounds; i++) {
            var from = Math.floor(Math.random() * 9) + 1;
            var r2 = Math.floor(Math.random() * (8 - 4 + 1) + 4);
            //var r2 = Math.floor(Math.random() * 8) + 1; 
            var to = from + r2;
            if (to >= 9) {
                to = to - 8;
            }
            //var newArr = this.insertAndShift(this.board,from,to);
            //this.board = newArr;
        }
        this.validBoard = true;
        //var newArr = this.insertAndShift(this.board,1,5);
        //this.board = newArr;
    };
    SudokuGame.prototype.insertAndShift = function (arr, from, to) {
        var arrNew = arr.map(function (x) {
            return x;
        });
        var cutOut = arrNew.splice(from, 1)[0]; // cut the element at index 'from'
        arrNew.splice(to, 0, cutOut); // insert it at index 'to'
        return arrNew;
    };
    SudokuGame.prototype.solverCheck = function (y, x) {
        var valid = true;
        var foundValid = false;
        var c = 0;
        var maxCount = 1000;
        var n = 0;
        var shift = 0;
        if (y != 0) {
            shift = this.shiftRows[y];
        }
        if (y == 0) {
            while (!foundValid && c < maxCount) {
                n = Math.floor(Math.random() * 9) + 1;
                if (this.used.indexOf(n) === -1) {
                    this.used.push(n);
                    valid = true;
                } else {
                    valid = false;
                }
                if (valid) {
                    this.board[y][x] = n;
                    foundValid = true;
                }
                c++;
            }
        } else {
            if (y > 0) {
                var xs = x + shift;
                if (xs >= 9) {
                    xs = xs - 9;
                }
                this.board[y][x] = this.board[y - 1][xs];
            }
        }
    };
    SudokuGame.prototype.update = function () {
        var el = Math.floor((Date.now() - this.ts) / 1000);
        var timeEl = document.getElementsByClassName('time')[0];
        timeEl.innerHTML = el.toString() + 'sec';
    };
    SudokuGame.prototype.updateBoard = function () {
        this.boardEl = document.getElementsByClassName('sudoku')[0];
        console.log(this.board);
        var cntNumbers = [];
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var input = this.boardEl.querySelector("tr[class='" + y + "'] > td[class='" + x + "'] > input");
                var val = parseInt(input.value[input.value.length - 1]);
                if (!isNaN(val)) {
                    this.board[y][x] = val;
                } else {
                    input.value = "";
                }
                if (this.board[y][x] !== 0) {
                    input.value = this.board[y][x].toString();
                }
                console.log(this.board[y][x]);
                if (!cntNumbers[this.board[y][x]]) {
                    cntNumbers[this.board[y][x]] = 0;
                }
                cntNumbers[this.board[y][x]]++;
            }
        }
        console.log(cntNumbers);
        for (var i = 1; i <= 9; i++) {
            if (cntNumbers[i] >= 9) {
                console.log('MAKE HIDEN!');
                var remainEl = document.getElementsByClassName('remaining')[0].querySelector('span[class="rm-' + i + '"]');
                remainEl.style.visibility = "hidden";
            } else {
                var remainEl = document.getElementsByClassName('remaining')[0].querySelector('span[class="rm-' + i + '"]');
                remainEl.style.visibility = "visible";
            }
        }
        if (JSON.stringify(this.board) == JSON.stringify(this.solvedBoard)) {
            alert('Completed sudoku!');
            this.storage.save("");
            this.reset();
        }
        var obj = {
            board: this.board,
            solvedBoard: this.solvedBoard
        };
        this.storage.save(JSON.stringify(obj));
    };
    SudokuGame.prototype.updateValue = function (y, x) {
        var valid = true;
        var input = this.boardEl.querySelector('input[class="' + y + '-' + x + '"');
        if (input.value == '') {
            this.board[y][x] = 0;
            input.value = '';
            return;
        } else if (parseInt(input.value) <= 0) {
            this.board[y][x] = 0;
            input.value = '';
            return;
        }
        if (parseInt(input.value) > 9) {
            var lastDigit = parseInt(input.value[input.value.length - 1]);
            this.board[y][x] = lastDigit;
            input.value = lastDigit.toString();
        }
        var val = parseInt(input.value);
        if (this.solvedBoard[y][x] > 0) {
            if (val != this.solvedBoard[y][x]) {
                valid = false;
            }
            if (valid) {
                this.validBoard = true;
                input.style.color = '#008259';
            } else {
                this.validBoard = false;
                input.style.color = '#ff0000';
            }
        }
    };
    return SudokuGame;
}();
window.onload = function () {
    var game = new SudokuGame();
    var inputs = document.querySelectorAll('tr > td > input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            var elem = e.target;
            var className = elem.getAttribute('class');
            var classSplit = className.split('-');
            game.updateValue(parseInt(classSplit[0]), parseInt(classSplit[1]));
            game.updateBoard();
        });
    }
    var btnNew = document.getElementsByClassName('btn-new')[0];
    btnNew.addEventListener('click', function (e) {
        console.log('click!');
        this.storage.save("");
        game.reset();
    });
};
//# sourceMappingURL=main.js.map