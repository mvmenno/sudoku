import {Solver} from './solver';

export class Generator{


    protected gridSize:number = 9;
	protected usedNumbers = [];
	protected shiftRows = [];
    protected board:number[][] = [];
    protected solvedBoard:number[][] = [];
    
    protected solver:Solver;


    constructor(){
        this.solver = new Solver();
    }
    
    public getSolvedBoard(): number[][]{
        return this.solvedBoard;
    }
    public generatePresetValues(): number[][]{
		var r1 = 3;	
		var r2 = 1;
        for(var y=0;y < this.gridSize ; y++){
            if(y > 0){
                if(y % 3 ==0){
                    this.shiftRows[y] = r2;
                }else{
                    this.shiftRows[y] = r1;
                }
            }
            this.board[y] = [];
            for(var x=0;x <this.gridSize;x++){
                this.board[y][x] = this.generateValue(y,x);
            }
        }
        var randomizeRounds = 6;
        for(var i = 0; i < randomizeRounds; i++){
            this.board = this.randomizeBoard();
        }
        this.solvedBoard = JSON.parse(JSON.stringify(this.board));

        var removeNumberCount =48;

        var toRemoveArray: number[][] = [];
        x = null;
        var removedNumbers = 0;

        var cnt = 0;

        var ts:number = Date.now();

        var boardClone = JSON.parse(JSON.stringify(this.board));
        while(removedNumbers < removeNumberCount && cnt < 1000){
            var boardClone = JSON.parse(JSON.stringify(this.board));
            var randY = Math.floor(Math.random() * 9);
            var randX = Math.floor(Math.random() * 9);
            if(boardClone[randY][randX] != 0){
                boardClone[randY][randX] = 0;   
                var solCount = this.solver.solveBoard(boardClone,0,0);
                if(solCount == 1){
                    this.board[randY][randX] = 0;
                    removedNumbers ++;
                }
            }
            cnt++;
        }

        console.log('Time took: '+( (Date.now() - ts) /1000 )+' s');

        return this.board;
    }




    public randomizeBoard(): number[][]{
        var board = this.board.map((x) => x);

        var shiftRounds = 6;

        var r = Math.random();

       // var type = 'shiftRow';
        var type = '';
        if(r < .50){
            type = 'shiftRow';
        }else{
            type = 'shiftColumn';
        }
        if(type == 'shiftRow' || type == 'shiftColumn'){
            var nr = 1;
            r = Math.random();
            if(r < .33){
                nr = 1;
            }else if(r < .66){
                nr = 4;
            }else{
                nr = 7;
            }
            r = Math.random();
            var rd = 0;

            if(r > .5){
                rd = 1;
            }else{
                rd = -1;
            }
            if(type == 'shiftRow'){
                console.log('Shift row!');
                console.log('from:'+nr+' to:'+(nr + rd));
                var boardNew = this.insertAndShift(board,nr,nr + rd);
                board = boardNew;
            }else{
                console.log('Shift Column!');
                console.log('from:'+nr+' to:'+(nr + rd));

                for(var y=0;y < this.gridSize ; y++){
                   board[y] = this.insertAndShift(board[y],nr,nr + rd);
                }
            }

            




        }
        return board;
    }
    protected insertAndShift(arr, from, to) {
		var arrNew = arr.map((x) => x);
		
		let cutOut = arrNew.splice(from, 1) [0]; // cut the element at index 'from'
		arrNew.splice(to, 0, cutOut);            // insert it at index 'to'
		
		return arrNew;
	}

    protected shiftRow(){

    }
    protected generateValue(y:number,x:number): number{
        var n = 0;
		var c = 0;
		var maxCount = 100000;
		var foundValid = false;
		var shift = 0; 

        if(y ==0){
			while(!foundValid && c < maxCount){
				n = Math.floor(Math.random() * 9) + 1;
				if(this.usedNumbers.indexOf(n) === -1){
					this.usedNumbers.push(n);					
                    foundValid = true;
				}
				if(foundValid){
                    return n;
				}
				c++;
			}
		}else{
			shift = this.shiftRows[y];
            var xs = x + shift;
            if(xs >= 9){
                xs = xs - 9;
            }
            return this.board[y - 1][xs];
        }

        


        return n;
    }







}