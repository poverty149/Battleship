// import Ship from "./ship";
var Ship= require('../Factory/ship')

describe("Ship",()=>{
    let sample;
    sample= new Ship({name:'lol',length:2});
    console.log(sample);


    test("Lol",()=>{
        expect(sample.isLength()).toBe(2);
    });
    test("sink",()=>{
        sample.hit(0);
        sample.hit(1);
        expect(sample.isSunk()).toBe(true);

    })
});