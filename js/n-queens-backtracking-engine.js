

class NQueensBacktrackingEngine{

    constructor(n = 8){
        this.n = n;
    }

    get n(){
        return this._n;
    }

    set n(n){
        this._n = n;
    }

    
    generateBoard(){
        const { n } = this;
        this.board = Array.from(Array(n)).map(() => Array(n).fill(0));
    }

    *run(){
        this.generateBoard();

        for(let res of this._solve()){
            yield res;
        }
    }

    *_solve(row = 0){
        const { n, board } = this;

        if(row >= n){
            return true;
        }

        for(let i = 0; i < n; i ++){
            if(this._isUnderAttack(i, row)) continue;

            board[row][i] = 1;
            yield this._deepClone(board);

            if(yield* this._solve(row + 1)){
                return true;
            }

            board[row][i] = 0;
        }

        return false;
    }

    _deepClone(i){
        return JSON.parse(JSON.stringify(i));
    }


    _isUnderAttack(x, y){
        const { n, board } = this;

        
        for(let i = 0; i < n; i ++){
            if(board[y][i] || board[i][x]){
                return true;
            }
        }

        
        for(let j = 0; j < n; j ++){
            for(let i = 0; i < n; i ++){
                if(!board[j][i]) continue;

                
                const gradient = Math.abs((y - j) / (x - i));

                
                if(gradient === 1)
                    return true;

            }
        }

        return false;
    }
}