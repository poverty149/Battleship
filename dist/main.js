/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Factory/gameboard.js":
/*!**********************************!*\
  !*** ./src/Factory/gameboard.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// import Ship from \"./ship\";\nvar Ship= __webpack_require__(/*! ./ship */ \"./src/Factory/ship.js\")\nvar rand=__webpack_require__(/*! ../Helper/randCoord */ \"./src/Helper/randCoord.js\")\nvar shiptype=__webpack_require__(/*! ../Helper/shiptypes */ \"./src/Helper/shiptypes.js\")\nclass GameBoard{\n    constructor(){\n        this.board=this.CreateBoard();\n        this.miss=[];\n        this.placedShip=[];\n    }\n    checkValidPlacement(length,x,y,orientation){\n        var key=true;\n        if(orientation=='x'){\n            if(0<=x<10&&x+length-1<10){\n                for(let i=0;i<length;i++){\n                    if(this.board[x+i][y].hasShip!=null){\n                        key=false;\n                        // console.log(\"meow\",x+1,'o',y)\n                        break;\n                    };\n                };\n                \n            }else{key=false;\n            };\n        }else{\n        \n            if(0<=y<10&&y+length-1<10){\n                for(let i=0;i<length;i++){\n                    if(this.board[x][y+i].hasShip!=null){\n                        key=false;\n                        // console.log(\"meow2\",x,'o',y+1)\n                        break;\n                    };\n                };\n            }else{\n                key=false;\n            }\n\n        }\n        console.log(x,'x',y,'key',key,'ori',orientation)\n        return key;\n    };\n\n    PlaceShip(ship,x,y,orientation='x'){\n        \n        if(this.checkValidPlacement(ship.isLength(),x,y,orientation)){\n            console.log('valid',this.checkValidPlacement(ship.isLength(),x,y,orientation));\n            for(let i=0;i<ship.len;i++){\n                if(orientation=='x'){\n                    this.board[x+i][y].hasShip=ship;\n                    this.board[x+i][y].index=i;\n                    ship.position.push({'x':x+i,'y':y});\n\n                }else{\n                    // console.log(x,'i',y);\n                    this.board[x][y+i].hasShip=ship;\n                    \n                    this.board[x][y+i].index=i;\n                    ship.position.push({'x':x,'y':y+i});\n\n\n                }\n            }\n            this.placedShip.push(ship);\n            console.log(ship.position,'pos of ship')\n            return true;\n        }\n        // console.log(this.placedShip,'gvhvgj');\n        return false;\n        \n\n\n    }\n    autoPlace(ship){\n        var [x,y]=[rand(10),rand(10)];\n        var xDir=Math.random()>0.5;\n        var Dir=xDir?'x':'y';\n        // console.log(x,'jlkjlkj',y)\n        let placeship=this.PlaceShip(ship,x,y,Dir);\n        console.log(placeship,'placed??');\n        if(!placeship){this.autoPlace(ship)};\n        \n\n\n\n    }\n    autoPlaceFleet(){\n        shiptype.forEach(element => {\n            let tempShip=new Ship(element);\n            console.log(element,'pppkp')\n            this.autoPlace(tempShip);\n            console.log(tempShip.position,'pojojpo',tempShip.len);\n\n            \n        });\n    }\n    receiveAttack(x,y){\n        var ship=this.board[x][y].hasShip;\n        this.board[x][y].hit=true;\n        if(ship!=null){\n            ship.hit(this.board[x][y].index);\n\n        }else{\n            this.miss.push({x,y});\n        }\n    }\n    missedAttacks(){\n        return this.miss;\n    }\n    allSunk(){\n        return this.placedShip.every(element => element.isSunk());\n\n    }\n    CreateBoard(){\n        let array=[];\n        let temp=[];\n        for(let i=0;i<10;i++){\n            for(let j=0;j<10;j++){\n                temp.push({hasShip:null,hit:false,index:null});\n            }\n            array.push(temp);\n            temp=[];\n        }\n        return array;\n    }\n    getBoard(){\n        return this.board;\n    }\n\n};\nmodule.exports=GameBoard;\n// export default GameBoard\n\n\n//# sourceURL=webpack://battleship/./src/Factory/gameboard.js?");

/***/ }),

/***/ "./src/Factory/player.js":
/*!*******************************!*\
  !*** ./src/Factory/player.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var rand=__webpack_require__(/*! ../Helper/randCoord */ \"./src/Helper/randCoord.js\")\nclass Player{\n    constructor(name){\n        this.name=name;\n        this.turn=true;\n        this.win=0;\n    }\n    getName(){\n        return this.name;\n    }\n    setName(name){\n        this.name=name;\n\n    }\n    endTurn(opponent){\n        this.turn=false;\n        opponent.startTurn();\n    }\n    startTurn(){\n        this.turn=true;\n\n    }\n    attack(x,y,opponent,opponentBoard){\n        if(this.turn){\n            opponentBoard.receiveAttack(x,y);\n            this.endTurn(opponent);\n        }\n    }\n    autoAttack(opponent,opponentBoard){\n        \n        let x=rand(10);\n        let y=rand(10);\n\n        let cell=opponentBoard.getBoard()[x][y]\n        if(cell.hit){\n            this.autoAttack(opponent,opponentBoard);\n        }else{\n            console.log(x,y,'blimey')\n            opponentBoard.receiveAttack(x,y);\n            this.endTurn(opponent);\n        }\n        \n    }\n};\nmodule.exports=Player;\n\n//# sourceURL=webpack://battleship/./src/Factory/player.js?");

/***/ }),

/***/ "./src/Factory/ship.js":
/*!*****************************!*\
  !*** ./src/Factory/ship.js ***!
  \*****************************/
/***/ ((module) => {

eval("class Ship{\n    constructor(element){\n        this.len=element.length;\n        this.name=element.name;\n        this.ship=this.createShip();\n        this.position=[];\n        \n        \n    }\n    createShip(){\n        let ship=[];\n        let l=this.len;\n        for(let i=0;i<l;i++){\n            ship.push({hit:false});\n        }\n        return ship;\n    }\n    isLength(){\n        return this.len;\n    }\n    hit(index){\n        this.ship[index].hit=true;\n\n    }\n    isSunk(){\n        let l=this.len;\n        let ans=true;\n        for(let i=0;i<l;i++){\n            if(this.ship[i].hit==true){\n                continue;\n            }else{\n                ans=false;\n                break;\n            }\n        }\n        return ans;\n\n    }\n};\nmodule.exports=Ship;\n\n//# sourceURL=webpack://battleship/./src/Factory/ship.js?");

/***/ }),

/***/ "./src/Helper/header.js":
/*!******************************!*\
  !*** ./src/Helper/header.js ***!
  \******************************/
/***/ ((module) => {

eval("const Header=()=>{\n    let head=document.getElementById('header')\n    head.textContent=\"Batlleship\";\n    return head;\n\n}\nmodule.exports=Header\n\n\n\n//# sourceURL=webpack://battleship/./src/Helper/header.js?");

/***/ }),

/***/ "./src/Helper/randCoord.js":
/*!*********************************!*\
  !*** ./src/Helper/randCoord.js ***!
  \*********************************/
/***/ ((module) => {

eval("function randCoord (size = 10) {\n   x= Math.floor(Math.random() * size);\n   return x;\n} ;\n\n\nmodule.exports=randCoord;\n\n//# sourceURL=webpack://battleship/./src/Helper/randCoord.js?");

/***/ }),

/***/ "./src/Helper/shiptypes.js":
/*!*********************************!*\
  !*** ./src/Helper/shiptypes.js ***!
  \*********************************/
/***/ ((module) => {

eval("const ship_types=[\n    {\n        name:'carrier',\n        length:5,\n    },\n    {\n        name:'battleship',\n        length:4,\n\n    },\n    {\n        name:'submarine',\n        length:3,\n    },\n    {\n        name:'cruiser',\n        length:3,\n    },\n    {\n        name:'destroyer',\n        length:2,\n    }\n];\nmodule.exports=ship_types;\n\n//# sourceURL=webpack://battleship/./src/Helper/shiptypes.js?");

/***/ }),

/***/ "./src/Helper/view.js":
/*!****************************!*\
  !*** ./src/Helper/view.js ***!
  \****************************/
/***/ ((module) => {

eval("\n\n\n// function to create individual cells in the html file\nconst root=document.getElementById('game_wrapper');\nfunction renderCell(x,y){\n    var temp=document.createElement('div');\n    temp.classList.add('cell-grid');\n    xdata='data-x-'+x.toString();\n    \n    ydata=\"data-y-\"+y.toString();\n\n    temp.classList.add(xdata);\n    temp.classList.add(ydata);\n    temp.setAttribute('data-x',x);\n    temp.setAttribute('data-y',y);\n    temp.textContent='u';\n    return temp;\n\n    \n};\n\nfunction updateBoard(name,board){\n    const boardArray=board.getBoard();\n    \n    for(let i=0;i<10;i++){\n        for(let j=0;j<10;j++){\n            let cell=boardArray[i][j];\n            let data=\".data-x-\"+i.toString()+\".data-y-\"+j.toString();\n            let grid=\".\"+name;\n               \n            let dispcell=document.querySelector(grid+data);\n            \n            if(cell.hasShip){\n                \n                \n                dispcell.textContent='x';\n                if(cell.hit){\n                    dispcell.classList.add('hit');\n                    \n                }\n                \n            }else{\n                if(cell.hit){\n                    dispcell.classList.add('miss');\n\n                }\n            }\n\n\n        }\n    }\n\n};\nfunction createBoard(name){\n    const board=document.getElementById(name);\n    board.classList.add('grid');\n    board.classList.add(name);\n    // board.title(name)\n\n\n\n\n    for(let i=0;i<10;i++){\n        for(let j=0;j<10;j++){\n            const cell=renderCell(j,i);\n            cell.classList.add(name)\n            \n            board.appendChild(cell);\n    \n        }\n        \n    };\n    root.appendChild(board);\n\n}\nmodule.exports={createBoard,updateBoard};\n\n//# sourceURL=webpack://battleship/./src/Helper/view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const shiptype=__webpack_require__(/*! ./Helper/shiptypes */ \"./src/Helper/shiptypes.js\")\nconst Ship=__webpack_require__(/*! ./Factory/ship */ \"./src/Factory/ship.js\")\nconst GameBoard=__webpack_require__(/*! ./Factory/gameboard */ \"./src/Factory/gameboard.js\")\nvar Player=__webpack_require__(/*! ./Factory/player */ \"./src/Factory/player.js\")\nconst rand=__webpack_require__(/*! ./Helper/randCoord */ \"./src/Helper/randCoord.js\")\nconst root=document.getElementById('game_wrapper');\nconst view=__webpack_require__(/*! ./Helper/view */ \"./src/Helper/view.js\")\nconst createBoard=view.createBoard;\nconst updateBoard=view.updateBoard;\nconst Header=__webpack_require__(/*! ./Helper/header */ \"./src/Helper/header.js\");\nfunction attackEvent(e){\n    let cel=e.target;\n    let x=cel.getAttribute('data-x');\n    let y=cel.getAttribute('data-y');\n    p1.attack(x,y,p2,p2board);\n    // p2board.receiveAttack(x,y);\n    updateBoard('p2',p2board);\n    endGame(p2board);\n    p2.autoAttack(p1,p1board);\n    updateBoard('p1',p1board);\n    endGame(p1board);\n\n}\n\n// const window=document.querySelector(\"#over\")\nconsole.log(\"over\",window)\nfunction endGame(board){\n    if(board.allSunk()){\n        console.log('win')\n        console.log(p1.turn);\n        console.log(p2.turn)\n\n        \n        root.classList.add(\"hide\")\n        const window=document.getElementById(\"over\")\n        const winner= p1.turn?p2.name:p1.name;\n        window.textContent=\"win\"+winner;\n        window.classList.remove(\"hide\")\n        // root.appendChild(window)\n        board.textContent=\"win\";\n    }\n}\n// const roo=document.getElementById('content');\nfunction placeAll(board){\n    shiptype.forEach(element => {\n        board.textContent=\"Place \"+element.name;\n        // currentShip=element;\n        // board.addEventListener('hover',placingEvent);\n    });\n}\nfunction placingEvent(e){\n    const cell=e.target;\n    const x=cell.getAttribute(data-x);\n    const y=cell.getAttribute(data-y);\n    let orientation='x';\n    let key =false;\n    // key=board.placeShip(ship,x,y,orientation);\n    // if(!key) placingEvent(e,ship,board);\n}\n\nvar currentShipIndex=0;\nvar currentShip=shiptype[currentShipIndex];\nvar currentDir='x';\nvar p1=new Player('p1');\nvar p2=new Player('p2');\nvar p1board=new GameBoard;\nvar p2board=new GameBoard;\n\n\n\nfunction dropShip(e){\n    const cell=e.target;\n    let x=Number(cell.dataset.x);\n    let y=Number(cell.dataset.y);\n    if(p1board.checkValidPlacement(currentShip.length,x,y,currentDir)){\n        let ship=new Ship(currentShip);\n        p1board.PlaceShip(ship,x,y,currentDir);\n        console.log(p1board.getBoard()[x][y],'badadada',x,'k',y);\n        console.log(p1board.getBoard()[3][0])\n        console.log(ship,'hbhjbj')\n        for(let i=0;i<currentShip.length;i++){\n            if(currentDir=='x'){\n                let data=\".data-x-\"+(x+i).toString()+\".data-y-\"+y.toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.add(\"ship\")\n\n            }else if(currentDir=='y'){\n                let data=\".data-x-\"+(x).toString()+\".data-y-\"+(y+i).toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.add(\"ship\")\n            }\n        }        \n      \n        currentShipIndex++;\n        \n        if(currentShipIndex==5){\n            place=false;\n        }else{\n            currentShip=shiptype[currentShipIndex];\n        }\n        \n        if(!place){\n            let p1_grid=document.querySelector('.grid.p1');\n            let p2_grid=document.querySelector('.grid.p2');\n            p1_grid.removeEventListener('click',dropShip)\n            p1_grid.removeEventListener('mouseover',changeClr)\n            p1_grid.removeEventListener('mouseout',exitClr)\n            \n            // p1.addEventListener('click',attackEvent);\n            p2_grid.addEventListener('click',attackEvent);\n        }\n    }\n}\n\n\nfunction changeClr(e){\n    const cell=e.target;\n    \n    if(cell.classList.contains('cell-grid')){\n        let x=cell.dataset.x;\n        let y=cell.dataset.y;\n        let f=true;\n        for(let i=0;i<currentShip.length;i++){\n            \n            if(currentDir=='x'&&Number(x)+currentShip.length>10||currentDir=='y'&&Number(y)+currentShip.length>10){\n                f=false;\n                let data=\".data-x-\"+(x).toString()+\".data-y-\"+y.toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.add(\"incorrect\");\n                break;\n\n            }\n            else if(currentDir=='x'&&Number(x)+i<10){\n                let data=\".data-x-\"+(Number(x)+i).toString()+\".data-y-\"+y.toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.add(\"red\")\n\n            }else if(currentDir=='y'&&Number(y)+i<10){\n                let data=\".data-x-\"+(x).toString()+\".data-y-\"+(Number(y)+i).toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.add(\"red\")\n\n            }\n        }\n    \n        \n\n\n    }\n    // const y=cell.getAttribute(data-y);\n    \n\n\n}\n\nfunction exitClr(e){\n    const cell=e.target;\n    \n    if(cell.classList.contains('cell-grid')){\n        x=cell.dataset.x;\n        y=cell.dataset.y;\n        \n        for(let i=0;i<currentShip.length;i++){\n            if(currentDir=='x'&&Number(x)+currentShip.length>10||currentDir=='y'&&Number(y)+currentShip.length>10){\n                let data=\".data-x-\"+(x).toString()+\".data-y-\"+y.toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.remove(\"incorrect\");\n                break;\n\n            }\n            else if(currentDir=='x'){\n                let data=\".data-x-\"+(Number(x)+i).toString()+\".data-y-\"+y.toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.remove(\"red\")\n\n            }else if(currentDir=='y'&&Number(y)+i<10){\n                let data=\".data-x-\"+(x).toString()+\".data-y-\"+(Number(y)+i).toString();\n                let grid=\".p1\";\n                let dispcell=document.querySelector(grid+data);\n                dispcell.classList.remove(\"red\")\n\n            }\n        }\n        \n        \n\n\n    }\n    // const y=cell.getAttribute(data-y);\n    \n\n\n}\nHeader();\ncreateBoard('p1');\ncreateBoard('p2');\nvar place=true;\nif(place){  \n    let p1_grid=document.querySelector('.grid.p1');\n    p1_grid.addEventListener('click',dropShip);\n    p1_grid.addEventListener('mouseover',changeClr);\n    p1_grid.addEventListener('mouseout',exitClr)\n}\n// placeAll(p1board);\n// p1board.autoPlaceFleet();\np2board.autoPlaceFleet();\n// let data=\".data-x-\"+(5).toString()+\".data-y-\"+(2).toString();\n// let grid=\".p1\";\n// let dispcell=document.querySelector(grid+data);\n// dispcell.classList.add(\"ship\")\nupdateBoard('p1',p1board);\nupdateBoard('p2',p2board);\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;