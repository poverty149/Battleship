


// function to create individual cells in the html file
const root=document.getElementById('game_wrapper');
function renderCell(x,y){
    var temp=document.createElement('div');
    temp.classList.add('cell-grid');
    xdata='data-x-'+x.toString();
    
    ydata="data-y-"+y.toString();

    temp.classList.add(xdata);
    temp.classList.add(ydata);
    temp.setAttribute('data-x',x);
    temp.setAttribute('data-y',y);
    temp.textContent='u';
    return temp;

    
};

function updateBoard(name,board){
    const boardArray=board.getBoard();
    
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            let cell=boardArray[i][j];
            let data=".data-x-"+i.toString()+".data-y-"+j.toString();
            let grid="."+name;
               
            let dispcell=document.querySelector(grid+data);
            
            if(cell.hasShip){
                
                
                dispcell.textContent='x';
                if(cell.hit){
                    dispcell.classList.add('hit');
                    
                }
                
            }else{
                if(cell.hit){
                    dispcell.classList.add('miss');

                }
            }


        }
    }

};
function createBoard(name){
    const board=document.getElementById(name);
    board.classList.add('grid');
    board.classList.add(name);
    // board.title(name)




    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            const cell=renderCell(j,i);
            cell.classList.add(name)
            
            board.appendChild(cell);
    
        }
        
    };
    root.appendChild(board);

}
module.exports={createBoard,updateBoard};