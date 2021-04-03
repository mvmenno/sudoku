import {Storage} from './storage';
import {Generator} from './generator';
import {Solver} from './solver';

class SudokuGame{
    public board :number[][];
    protected solvedBoard:number[][];

    protected boardEl:HTMLElement;
	protected used = [];
	protected shiftRows = [];
	protected validBoard = false;
    protected ts = 0;

    protected storage:Storage;
    protected generator:Generator;
    protected solver:Solver;

    constructor(){
        this.storage = new Storage();
        this.generator = new Generator();
        this.solver = new Solver();

        this.reset();
    }
    reset(){
        this.ts = Date.now();
        this.board = [];
        this.solvedBoard = [];
        this.used = [];
        this.shiftRows = [];
        this.validBoard = false;
        this.boardEl = <HTMLElement>document.getElementsByClassName('sudoku')[0];
        this.createBoard();

        var self = this;
        setInterval(function(){
            self.update();
        },1000);
    }

    createBoard(){
        var html = '';
        for(var y=0; y < 9; y ++){
            html += '<tr class="'+y+'">';

            this.board[y] = [];


            for(var x=0; x < 9; x++){
                html +=  '<td class="'+x+'"><input type="text" class="'+y+'-'+x+'"/></td>';

                this.board[y][x] = 0;
            }
            html += '</tr>';
        }

        this.boardEl.innerHTML = html;

        var loadedData = this.storage.load();

        var validLoadData = false;

        if(loadedData){
            var data = JSON.parse(loadedData);
            if(data.board && data.solvedBoard){
                validLoadData = true;
                this.board = data.board.map((x) => x);
                this.solvedBoard = data.solvedBoard.map((x) => x);
            }
        }
        if(!validLoadData){
           this.board = this.generator.generatePresetValues();
           this.solvedBoard = this.generator.getSolvedBoard();
        }

        this.updateBoard();
    }
    update(){
        var el = Math.floor((Date.now() - this.ts) / 1000);
        var timeEl = <HTMLElement>document.getElementsByClassName('time')[0];
        timeEl.innerHTML = el.toString()+'sec';
    }

    public updateBoard(){
        this.boardEl = <HTMLElement>document.getElementsByClassName('sudoku')[0];

        var cntNumbers = [];



        for(var y=0; y < 9; y ++ ){
            for(var x=0; x < 9; x++ ){
                var input: HTMLInputElement = this.boardEl.querySelector("tr[class='"+y+"'] > td[class='"+x+"'] > input");

                var val:number = parseInt(input.value[input.value.length - 1]);
                if(!isNaN(val)){
                    this.board[y][x] = val;
                }else{
                    input.value = "";
                }
                if(this.board[y][x] !== 0){
                   input.value = this.board[y][x].toString();
                }
                if(!cntNumbers[this.board[y][x]]){
                    cntNumbers[this.board[y][x]] = 0;
                }
                cntNumbers[this.board[y][x]] ++;
            }
        }

        for(var i=1; i <= 9; i++){
            if(cntNumbers[i] >= 9){
                var remainEl = <HTMLElement>document.getElementsByClassName('remaining')[0].querySelector('span[class="rm-'+i+'"]');
                remainEl.style.visibility = "hidden";
            }else{
                var remainEl = <HTMLElement>document.getElementsByClassName('remaining')[0].querySelector('span[class="rm-'+i+'"]');
                remainEl.style.visibility = "visible";
            }

        }

        if(JSON.stringify(this.board) == JSON.stringify(this.solvedBoard)){
            alert('Completed sudoku!');
            this.storage.save("");
            this.reset();

        }


        var obj = {
            board: this.board,
            solvedBoard: this.solvedBoard
        };

        this.storage.save(JSON.stringify(obj));

    }
	public updateValue(y:number,x:number){
		var valid = true;
		
		var input: HTMLInputElement = this.boardEl.querySelector('input[class="'+y+'-'+x+'"');
		
        if(input.value == ''){
            this.board[y][x] = 0;
            input.value = '';
            return;
        }else if(parseInt(input.value) <= 0){
            this.board[y][x] = 0;
            input.value = '';
            return;
        }
        if(parseInt(input.value) > 9){
            var lastDigit = parseInt(input.value[input.value.length -1]);

            this.board[y][x] = lastDigit;
            input.value = lastDigit.toString();
        }
        var val = parseInt(input.value);
		if(this.solvedBoard[y][x] > 0 ){
            if(val != this.solvedBoard[y][x]){
                valid = false;
            }
            if(valid){
                this.validBoard = true;
                input.style.color = '#008259';
                
            }else{
                this.validBoard = false;
                input.style.color = '#ff0000';
            }
		}
	}
}


window.onload = function(){
    
    let game = new SudokuGame();


    var inputs = document.querySelectorAll('tr > td > input');
    for(var i = 0; i< inputs.length; i ++){
        inputs[i].addEventListener('keyup',function(e){
		
            var elem: HTMLElement = <HTMLElement> e.target;
			var className = elem.getAttribute('class');
			
			var classSplit = className.split('-');
			
			game.updateValue(parseInt(classSplit[0]),parseInt(classSplit[1]));
            game.updateBoard();
        });
        
    }

    var btnNew = document.getElementsByClassName('btn-new')[0];
    
    btnNew.addEventListener('click',function(e){
        console.log('click!');
        this.storage.save("");
        game.reset();
    });



}