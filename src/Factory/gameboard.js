// import Ship from "./ship";
var Ship= require('./ship')
var rand=require('../Helper/randCoord')
var shiptype=require('../Helper/shiptypes')
class GameBoard{
    constructor(){
        this.board=this.CreateBoard();
        this.miss=[];
        this.placedShip=[];
    }
    checkValidPlacement(length,x,y,orientation){
        var key=true;
        if(orientation=='x'){
            if(0<=x<10&&x+length-1<10){
                for(let i=0;i<length;i++){
                    if(this.board[x+i][y].hasShip!=null){
                        key=false;
                        // console.log("meow",x+1,'o',y)
                        break;
                    };
                };
                
            }else{key=false;
            };
        }else{
        
            if(0<=y<10&&y+length-1<10){
                for(let i=0;i<length;i++){
                    if(this.board[x][y+i].hasShip!=null){
                        key=false;
                        // console.log("meow2",x,'o',y+1)
                        break;
                    };
                };
            }else{
                key=false;
            }

        }
        console.log(x,'x',y,'key',key,'ori',orientation)
        return key;
    };

    PlaceShip(ship,x,y,orientation='x'){
        
        if(this.checkValidPlacement(ship.isLength(),x,y,orientation)){
            console.log('valid',this.checkValidPlacement(ship.isLength(),x,y,orientation));
            for(let i=0;i<ship.len;i++){
                if(orientation=='x'){
                    this.board[x+i][y].hasShip=ship;
                    this.board[x+i][y].index=i;
                    ship.position.push({'x':x+i,'y':y});

                }else{
                    // console.log(x,'i',y);
                    this.board[x][y+i].hasShip=ship;
                    
                    this.board[x][y+i].index=i;
                    ship.position.push({'x':x,'y':y+i});


                }
            }
            this.placedShip.push(ship);
            console.log(ship.position,'pos of ship')
            return true;
        }
        // console.log(this.placedShip,'gvhvgj');
        return false;
        


    }
    autoPlace(ship){
        var [x,y]=[rand(10),rand(10)];
        var xDir=Math.random()>0.5;
        var Dir=xDir?'x':'y';
        // console.log(x,'jlkjlkj',y)
        let placeship=this.PlaceShip(ship,x,y,Dir);
        console.log(placeship,'placed??');
        if(!placeship){this.autoPlace(ship)};
        



    }
    autoPlaceFleet(){
        shiptype.forEach(element => {
            let tempShip=new Ship(element);
            console.log(element,'pppkp')
            this.autoPlace(tempShip);
            console.log(tempShip.position,'pojojpo',tempShip.len);

            
        });
    }
    receiveAttack(x,y){
        var ship=this.board[x][y].hasShip;
        this.board[x][y].hit=true;
        if(ship!=null){
            ship.hit(this.board[x][y].index);

        }else{
            this.miss.push({x,y});
        }
    }
    missedAttacks(){
        return this.miss;
    }
    allSunk(){
        return this.placedShip.every(element => element.isSunk());

    }
    CreateBoard(){
        let array=[];
        let temp=[];
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                temp.push({hasShip:null,hit:false,index:null});
            }
            array.push(temp);
            temp=[];
        }
        return array;
    }
    getBoard(){
        return this.board;
    }

};
module.exports=GameBoard;
// export default GameBoard
