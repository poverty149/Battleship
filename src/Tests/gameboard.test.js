// import {GameBoard} from "./gameboard.js"
var GameBoard=require('../Factory/gameboard')
let game=new GameBoard;
var Ship= require('../Factory/ship')
var shiptype=require('../Helper/shiptypes')
describe("Gameboard", ()=>{
    
    // console.log(game);
    // let object={hasShip:null,hit:false,index:null}
    // test("board",()=>{
    //     expect(game.getBoard()[9][9]).toEqual(object)
    // });
    // test("add all shiptypes",()=>{
    //     shiptype.forEach(element => {
    //         let temp= new Ship(element);
    //         game.PlaceShip(temp,2,5,'x');
    //         console.log('jhkjbkj')
    //     });
    // })
    // // let y=new Ship({name:'f',length:2});
    // test("add ship",()=>{
    //     // let object2={hasShip:y,hit:false,index:0};
    //     // game.PlaceShip(y,2,5,'x')
    //     console.log('hello')
    //     console.log(game.getBoard()[2][5])
    //     // expect(game.getBoard()[2][5]).toEqual(object2);
    // });
    // test("attack ship",()=>{
    //     game.receiveAttack(2,5);
    
    //     // expect(y.ship[game.board[2][5].index].hit).toEqual(true);
    // })
    // test("placed ship",()=>{
    //     console.log(game.placedShip);
    //     game.receiveAttack(2,6);
    //     console.log(game.allSunk());
        


    // })
    // 
    let game2=new GameBoard;
    test('valid placement',()=>{
        let ship1=new Ship(shiptype[0]);

        f=game2.checkValidPlacement(ship1.len,3,8,'y');
        expect(f).toBe(false);

        
    })
    test('Placing overlap',()=>{
        let ship1=new Ship(shiptype[0]);
        let ship2=new Ship(shiptype[1])

        game2.PlaceShip(ship1,3,5,'y');
        
        game2.PlaceShip(ship2,7,5,'y');
        t=game2.getBoard()[7][5];
        console.log(t);
    })
    // test("autoplace function",()=>{
       
    //     game2.autoPlaceFleet();
        
    //     console.log("here");
    // })


})