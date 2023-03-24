const shiptype=require('./Helper/shiptypes')
const Ship=require('./Factory/ship')
const GameBoard=require('./Factory/gameboard')
var Player=require('./Factory/player')
const rand=require('./Helper/randCoord')
const root=document.getElementById('game_wrapper');
const view=require('./Helper/view')
const createBoard=view.createBoard;
const updateBoard=view.updateBoard;
const Header=require('./Helper/header');
function attackEvent(e){
    let cel=e.target;
    let x=cel.getAttribute('data-x');
    let y=cel.getAttribute('data-y');
    p1.attack(x,y,p2,p2board);
    // p2board.receiveAttack(x,y);
    updateBoard('p2',p2board);
    endGame(p2board);
    p2.autoAttack(p1,p1board);
    updateBoard('p1',p1board);
    endGame(p1board);

}

// const window=document.querySelector("#over")
console.log("over",window)
function endGame(board){
    if(board.allSunk()){
        console.log('win')
        console.log(p1.turn);
        console.log(p2.turn)

        
        root.classList.add("hide")
        const window=document.getElementById("over")
        const winner= p1.turn?p2.name:p1.name;
        window.textContent="win"+winner;
        window.classList.remove("hide")
        // root.appendChild(window)
        board.textContent="win";
    }
}
// const roo=document.getElementById('content');
function placeAll(board){
    shiptype.forEach(element => {
        board.textContent="Place "+element.name;
        // currentShip=element;
        // board.addEventListener('hover',placingEvent);
    });
}
function placingEvent(e){
    const cell=e.target;
    const x=cell.getAttribute(data-x);
    const y=cell.getAttribute(data-y);
    let orientation='x';
    let key =false;
    // key=board.placeShip(ship,x,y,orientation);
    // if(!key) placingEvent(e,ship,board);
}

var currentShipIndex=0;
var currentShip=shiptype[currentShipIndex];
var currentDir='x';
var p1=new Player('p1');
var p2=new Player('p2');
var p1board=new GameBoard;
var p2board=new GameBoard;



function dropShip(e){
    const cell=e.target;
    let x=Number(cell.dataset.x);
    let y=Number(cell.dataset.y);
    if(p1board.checkValidPlacement(currentShip.length,x,y,currentDir)){
        let ship=new Ship(currentShip);
        p1board.PlaceShip(ship,x,y,currentDir);
        console.log(p1board.getBoard()[x][y],'badadada',x,'k',y);
        console.log(p1board.getBoard()[3][0])
        console.log(ship,'hbhjbj')
        for(let i=0;i<currentShip.length;i++){
            if(currentDir=='x'){
                let data=".data-x-"+(x+i).toString()+".data-y-"+y.toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.add("ship")

            }else if(currentDir=='y'){
                let data=".data-x-"+(x).toString()+".data-y-"+(y+i).toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.add("ship")
            }
        }        
      
        currentShipIndex++;
        
        if(currentShipIndex==5){
            place=false;
        }else{
            currentShip=shiptype[currentShipIndex];
        }
        
        if(!place){
            let p1_grid=document.querySelector('.grid.p1');
            let p2_grid=document.querySelector('.grid.p2');
            p1_grid.removeEventListener('click',dropShip)
            p1_grid.removeEventListener('mouseover',changeClr)
            p1_grid.removeEventListener('mouseout',exitClr)
            
            // p1.addEventListener('click',attackEvent);
            p2_grid.addEventListener('click',attackEvent);
        }
    }
}


function changeClr(e){
    const cell=e.target;
    
    if(cell.classList.contains('cell-grid')){
        let x=cell.dataset.x;
        let y=cell.dataset.y;
        let f=true;
        for(let i=0;i<currentShip.length;i++){
            
            if(currentDir=='x'&&Number(x)+currentShip.length>10||currentDir=='y'&&Number(y)+currentShip.length>10){
                f=false;
                let data=".data-x-"+(x).toString()+".data-y-"+y.toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.add("incorrect");
                break;

            }
            else if(currentDir=='x'&&Number(x)+i<10){
                let data=".data-x-"+(Number(x)+i).toString()+".data-y-"+y.toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.add("red")

            }else if(currentDir=='y'&&Number(y)+i<10){
                let data=".data-x-"+(x).toString()+".data-y-"+(Number(y)+i).toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.add("red")

            }
        }
    
        


    }
    // const y=cell.getAttribute(data-y);
    


}

function exitClr(e){
    const cell=e.target;
    
    if(cell.classList.contains('cell-grid')){
        x=cell.dataset.x;
        y=cell.dataset.y;
        
        for(let i=0;i<currentShip.length;i++){
            if(currentDir=='x'&&Number(x)+currentShip.length>10||currentDir=='y'&&Number(y)+currentShip.length>10){
                let data=".data-x-"+(x).toString()+".data-y-"+y.toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.remove("incorrect");
                break;

            }
            else if(currentDir=='x'){
                let data=".data-x-"+(Number(x)+i).toString()+".data-y-"+y.toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.remove("red")

            }else if(currentDir=='y'&&Number(y)+i<10){
                let data=".data-x-"+(x).toString()+".data-y-"+(Number(y)+i).toString();
                let grid=".p1";
                let dispcell=document.querySelector(grid+data);
                dispcell.classList.remove("red")

            }
        }
        
        


    }
    // const y=cell.getAttribute(data-y);
    


}
Header();
createBoard('p1');
createBoard('p2');
var place=true;
if(place){  
    let p1_grid=document.querySelector('.grid.p1');
    p1_grid.addEventListener('click',dropShip);
    p1_grid.addEventListener('mouseover',changeClr);
    p1_grid.addEventListener('mouseout',exitClr)
}
// placeAll(p1board);
// p1board.autoPlaceFleet();
p2board.autoPlaceFleet();
// let data=".data-x-"+(5).toString()+".data-y-"+(2).toString();
// let grid=".p1";
// let dispcell=document.querySelector(grid+data);
// dispcell.classList.add("ship")
updateBoard('p1',p1board);
updateBoard('p2',p2board);




