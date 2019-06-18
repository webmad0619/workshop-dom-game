// Dani Vicario - gridGenerator experiment (canvas)- Tue Jun 18 11:10:38 CEST 2019
const globalCompositeOperationModes = {
    "source-over": "source-over",
    "source-in": "source-in",
    "source-out": "source-out",
    "source-atop": "source-atop",
    "destination-over": "destination-over",
    "destination-in": "destination-in",
    "destination-out": "destination-out",
    "destination-atop": "destination-atop",
    "lighter": "lighter",
    "copy": "copy",
    "xor": "xor",
    "multiply": "multiply",
    "screen": "screen",
    "overlay": "overlay",
    "darken": "darken",
    "lighten": "lighten",
    "color-dodge": "color-dodge",
    "color-burn": "color-burn",
    "hard-light": "hard-light",
    "soft-light": "soft-light",
    "difference": "difference",
    "exclusion": "exclusion",
    "hue": "hue",
    "saturation": "saturation",
    "color": "color",
    "luminosity": "luminosity"
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/** @type HTMLCanvasElement */
var canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
var ctx = canvasDOMEl.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;
var w2 = w / 2;
var h2 = h / 2;

var PI = Math.PI;
var PI_DOUBLE = 2 * Math.PI;
var PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

const Game = {
    init: function () {
        console.log("game was initialised")

        // gameBoard (starting with lowercase) means an instance of the class GameBoard
        // GameBoard (starting with uppercase) mean the class GameBoard
        const gameBoard = new GameBoard()
        // this is another game subsystem that doesnt not exist :)
        // const scoreBoard = new ScoreBoard()

        gameBoard.draw()
        //scoreBoard.init()
    }
}

const dungeonFloorImg = new Image()
const dungeonFloorWithBloodImg = new Image()

dungeonFloorImg.src = './dungeonFloor.png'
dungeonFloorImg.onload = function () {
    dungeonFloorWithBloodImg.src = './dungeonFloorWithBlood.png'
    dungeonFloorWithBloodImg.onload = function () {
        // here the asset preload has finished

        Game.init()
    }
}

class GenericFloor {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y)
    }
}

class DungeonFloor extends GenericFloor {
    constructor(x, y) {
        super(x, y)
        this.img = dungeonFloorImg
    }
}

class DungeonFloorWithBlood extends GenericFloor {
    constructor(x, y) {
        super(x, y)
        this.img = dungeonFloorWithBloodImg
    }
}

class GameBoard {
    constructor() {
        this.totalColumns = 20
        this.totalRows = 20
        this.floorWidth = 90
        this.floorHeight = 90

        let generateFloorRow = (currentRow) => {
            // DungeonFloor receives two args, (x, y)
            // please remember that the asset both w and h is 90px
            return Array(this.totalColumns).fill().map((x, idx) =>
                new DungeonFloor(idx * this.floorWidth, currentRow * this.floorHeight))
        }

        this.tiles = []

        // here we build the floor :)
        for (var row = 0; row < this.totalRows; row++) {
            this.tiles.push(generateFloorRow(row))
        }

        for (let row = 0; row < this.totalRows; row++) {
            for (let column = 0; column < this.totalColumns; column++) {
                if (randomInt(0, 100) > 99) {
                    this.tiles[row][column] = new DungeonFloorWithBlood(column * this.floorWidth, row * this.floorHeight)
                }
            }
        }
    }

    draw() {

        for (var row = 0; row < 20; row++) {
            for (var column = 0; column < 20; column++) {
                this.tiles[row][column].draw()
            }
        }
    }
}

