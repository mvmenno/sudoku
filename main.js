var sudokuGame = /** @class */ (function () {
    function sudokuGame() {
        this.used = [];
        this.shiftRows = [];
        this.validBoard = false;
        console.log('constructor');
        this.board = [];
        this.boardEl = document.getElementsByClassName('sudoku')[0];
        this.generateBoard();
    }
    sudokuGame.prototype.generateBoard = function () {
        var html = '';
        console.log('genboard!');
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
        this.generatePresetValues();
        this.updateBoard();
    };
    sudokuGame.prototype.generatePresetValues = function () {
        var r1 = 3;
        var r2 = 1;
        for (var y = 0; y < 9; y++) {
            if (y == 1 || y == 2 || y == 4 || y == 5 || y == 7 || y == 8) {
                this.shiftRows[y] = r1;
            }
            else if (y > 0) {
                this.shiftRows[y] = r2;
            }
            for (var x = 0; x < 9; x++) {
                this.solverCheck(y, x);
                var chance = Math.random();
                if (chance < .25) {
                    //this.board[y][x] = 0;
                }
            }
        }
        console.log(this.shiftRows);
        // randomize rows
        var shiftRounds = 2;
        var self = this;
        for (var i = 0; i < shiftRounds; i++) {
            var from = Math.floor(Math.random() * 9) + 1;
            var r2 = Math.floor(Math.random() * (8 - 4 + 1) + 4);
            //var r2 = Math.floor(Math.random() * 8) + 1; 
            var to = from + r2;
            if (to >= 9) {
                to = to - 8;
            }
            var newArr = this.insertAndShift(this.board, from, to);
            this.board = newArr;
        }
        this.validBoard = true;
        //var newArr = this.insertAndShift(this.board,1,5);
        //this.board = newArr;
    };
    sudokuGame.prototype.insertAndShift = function (arr, from, to) {
        var arrNew = Array.from(arr);
        var cutOut = arrNew.splice(from, 1)[0]; // cut the element at index 'from'
        arrNew.splice(to, 0, cutOut); // insert it at index 'to'
        return arrNew;
    };
    sudokuGame.prototype.solverCheck = function (y, x) {
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
                }
                else {
                    valid = false;
                }
                if (valid) {
                    this.board[y][x] = n;
                    foundValid = true;
                }
                c++;
            }
        }
        else {
            //if(y == 1){
            var xs = x - shift;
            if (xs < 0) {
                xs = xs + 9;
            }
            this.board[y][x] = this.board[y - 1][xs];
            //}
        }
    };
    sudokuGame.prototype.updateBoard = function () {
        this.boardEl = document.getElementsByClassName('sudoku')[0];
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var input = this.boardEl.querySelector("tr[class='" + y + "'] > td[class='" + x + "'] > input");
                var val = parseInt(input.value[input.value.length - 1]);
                console.log(val);
                if (!isNaN(val)) {
                    this.board[y][x] = val;
                }
                else {
                    input.value = "";
                }
                if (this.board[y][x] !== 0) {
                    input.value = this.board[y][x].toString();
                }
            }
        }
    };
    sudokuGame.prototype.updateValue = function (y, x) {
        var valid = true;
        var input = this.boardEl.querySelector('input[class="' + y + '-' + x + '"');
        if (this.board[y][x] > 0) {
            for (var y2 = 0; y2 < 9; y2++) {
                for (var x2 = 0; x2 < 9; x2++) {
                    if (y2 == y && x2 != x) {
                        if (this.board[y][x] == this.board[y2][x2]) {
                            valid = false;
                            break;
                        }
                    }
                }
                if (x == x2 && y2 != y) {
                    if (this.board[y][x] == this.board[y2][x2]) {
                        valid = false;
                    }
                }
                if (valid) {
                    this.validBoard = true;
                    input.style.backgroundColor = '#00ff00';
                }
                else {
                    this.validBoard = false;
                    input.style.backgroundColor = '#ff0000';
                    break;
                }
            }
        }
    };
    return sudokuGame;
}());
window.onload = function () {
    var game = new sudokuGame();
    var inputs = document.querySelectorAll('tr > td > input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            var className = e.target.getAttribute('class');
            var classSplit = className.split('-');
            game.updateBoard();
            game.updateValue(parseInt(classSplit[0]), parseInt(classSplit[1]));
        });
    }
};
