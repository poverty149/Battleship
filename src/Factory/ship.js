class Ship{
    constructor(element){
        this.len=element.length;
        this.name=element.name;
        this.ship=this.createShip();
        this.position=[];
        
        
    }
    createShip(){
        let ship=[];
        let l=this.len;
        for(let i=0;i<l;i++){
            ship.push({hit:false});
        }
        return ship;
    }
    isLength(){
        return this.len;
    }
    hit(index){
        this.ship[index].hit=true;

    }
    isSunk(){
        let l=this.len;
        let ans=true;
        for(let i=0;i<l;i++){
            if(this.ship[i].hit==true){
                continue;
            }else{
                ans=false;
                break;
            }
        }
        return ans;

    }
};
module.exports=Ship;