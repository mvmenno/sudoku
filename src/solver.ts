export class Solver{

    protected solutionCnt : number = 0;
    constructor(){

    }

    public getSolutionCnt(){
        return this.solutionCnt;
    }
    public solveBoard(grid:number[][],row:number,col:number,count:number = 0):number{
        var n:number = 9;
        if(row == 9 ){
            row = 0;
            if(++col == 9){
                return 1+count;
            }
        }
        if(grid[row][col] != 0){
            return this.solveBoard(grid,row+1,col,count);
        }
        for(var num = 1; num <= n && count < 2; num ++){
            if(this.isSafe(grid,row,col,num)){
                grid[row][col] = num;
                count = this.solveBoard(grid,row+1,col,count);
            }
        }
        grid[row][col] = 0;
        return count;
    }

    protected isSafe(grid:number[][],row:number,col:number,num:number):boolean{
        var n:number = 9;
        
        for(var x =0; x < n; x ++){
            if(grid[row][x] == num){
                return false;
            }
            if (grid[x][col] == num){
                return false;
            }
        }
        var startRow:number = row - row % 3;
        var startCol:number = col - col % 3;

        for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){

                if(grid[i + startRow][j + startCol] == num){
                    return false;
                }
            }
        }

        return true;

    }
}