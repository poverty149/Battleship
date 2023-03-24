var rand=require('../Helper/randCoord')
class Player{
    constructor(name){
        this.name=name;
        this.turn=true;
        this.win=0;
    }
    getName(){
        return this.name;
    }
    setName(name){
        this.name=name;

    }
    endTurn(opponent){
        this.turn=false;
        opponent.startTurn();
    }
    startTurn(){
        this.turn=true;

    }
    attack(x,y,opponent,opponentBoard){
        if(this.turn){
            opponentBoard.receiveAttack(x,y);
            this.endTurn(opponent);
        }
    }
    autoAttack(opponent,opponentBoard){
        
        let x=rand(10);
        let y=rand(10);

        let cell=opponentBoard.getBoard()[x][y]
        if(cell.hit){
            this.autoAttack(opponent,opponentBoard);
        }else{
            console.log(x,y,'blimey')
            opponentBoard.receiveAttack(x,y);
            this.endTurn(opponent);
        }
        
    }
};
module.exports=Player;