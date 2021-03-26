var sudokuGame = /** @class */ (function () {
    function sudokuGame() {
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
                html += '<td class="' + x + '"><input type="text"/></td>';
                this.board[y][x] = 0;
            }
            html += '</tr>';
        }
        this.boardEl.innerHTML = html;
        this.generatePresetValues();
        this.updateBoard();
    };
    sudokuGame.prototype.generatePresetValues = function () {
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                this.solverCheck(y, x);
            }
        }
    };
    sudokuGame.prototype.solverCheck = function (y, x, rcount) {
        if (rcount === void 0) { rcount = 0; }
        if (rcount < 100) {
            var n = Math.floor(Math.random() * 9) + 1;
            console.log('solvercheck!');
            console.log('y: ' + y + ' x:' + x);
            var isSameRow = false;
            var valid = true;
            //return this.solverCheck(y,x,rcount);
            for (var yc = 0; yc < 9; yc++) {
                if (yc == y) {
                    isSameRow = true;
                }
                else {
                    break;
                }
                for (var xc = 0; xc < 9; xc++) {
                    if (isSameRow && x != xc) {
                        var v2 = this.board[y][xc];
                        if (n == v2 && v2 != 0) {
                            valid = false;
                            break;
                        }
                    }
                }
            }
            if (valid) {
                for (var xc = 0; xc < 9; xc++) {
                    var isSameColumn = false;
                    for (var yc = 0; yc < 9; yc++) {
                        if (yc == y) {
                            var v2 = this.board[yc][xc];
                            console.log(n);
                            console.log(v2);
                            if (n == v2 && v2 != 0) {
                                valid = false;
                                break;
                            }
                        }
                    }
                }
            }
            if (valid) {
                this.board[y][x] = n;
            }
            else {
                this.solverCheck(y, x, rcount++);
            }
        }
        else {
            console.log('too much iterations!');
            return;
        }
    };
    sudokuGame.prototype.updateBoard = function () {
        this.boardEl = document.getElementsByClassName('sudoku')[0];
        for (var y = 0; y < 9; y++) {
            for (var x = 0; x < 9; x++) {
                var input = this.boardEl.querySelector("tr[class='" + y + "'] > td[class='" + x + "'] > input");
                var val = parseInt(input.value[input.value.length - 1]);
                console.log(val);
                if (val > 0 && !isNaN(val)) {
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
    return sudokuGame;
}());
window.onload = function () {
    var game = new sudokuGame();
    var inputs = document.querySelectorAll('tr > td > input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            game.updateBoard();
        });
    }
};
