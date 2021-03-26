
class sudokuGame{
    public board :number[][];

    protected boardEl:HTMLElement;

    constructor(){
        console.log('constructor');
        this.board = [];
        this.boardEl = <HTMLElement>document.getElementsByClassName('sudoku')[0];
        this.generateBoard();
    }

    generateBoard(){
        var html = '';
        console.log('genboard!');
        for(var y=0; y < 9; y ++){
            html += '<tr class="'+y+'">';

            this.board[y] = [];


            for(var x=0; x < 9; x++){
                html +=  '<td class="'+x+'"><input type="text"/></td>';

                this.board[y][x] = 0;
            }
            html += '</tr>';
        }

        this.boardEl.innerHTML = html;
        
        this.generatePresetValues();
        this.updateBoard();
    }
    protected generatePresetValues(){


        for(var y=0;y < 9; y++){
            for(var x=0;x <9;x++){
                this.solverCheck(y,x);
            }
        }
    }
    protected solverCheck(y:number,x:number,rcount:number = 0){
        if(rcount < 100){

            var n = Math.floor(Math.random() * 9) + 1;
            console.log('solvercheck!');
            console.log('y: '+y+' x:'+x);
            var isSameRow:boolean = false;

            var valid = true;
            //return this.solverCheck(y,x,rcount);
            for(var yc=0;yc < 9; yc++){

                if(yc == y){
                    isSameRow = true;
                }else{
                    break;
                }
                for(var xc=0;xc <9;xc++){
                    if(isSameRow && x != xc){
                        var v2 = this.board[y][xc];
                        if(n == v2 && v2 != 0){
                            valid = false;
                            break;
                        }
                    }
                }
            }
            if(valid){
                for(var xc=0;xc <9;xc++){
                    var isSameColumn:boolean = false;    
                    for(var yc=0;yc < 9; yc++){
                        if(yc == y){
                            
                            var v2 = this.board[yc][xc];
                            console.log(n);
                            console.log(v2);
                            if(n == v2 && v2 != 0){
                                valid = false;
                                break;
                            }
                        }

                    }
                }
            }



            if(valid){
                this.board[y][x] = n;
            }else{
                this.solverCheck(y,x,rcount++);
            }

        }else{
            console.log('too much iterations!');
            return;
        }
    }



    public updateBoard(){
        this.boardEl = <HTMLElement>document.getElementsByClassName('sudoku')[0];
        for(var y=0; y < 9; y ++ ){
            for(var x=0; x < 9; x++ ){
                var input: HTMLInputElement = this.boardEl.querySelector("tr[class='"+y+"'] > td[class='"+x+"'] > input");

                var val:number = parseInt(input.value[input.value.length - 1]);

                console.log(val);
                if(val > 0 && !isNaN(val)){
                    this.board[y][x] = val;
                }else{
                    input.value = "";
                }


                if(this.board[y][x] !== 0){
                   input.value = this.board[y][x].toString();
                }

            }
        }
    }


}



window.onload = function(){
    
    let game = new sudokuGame();


    var inputs = document.querySelectorAll('tr > td > input');
    for(var i = 0; i< inputs.length; i ++){
        inputs[i].addEventListener('keyup',function(e){
            game.updateBoard();
        });
    }
}