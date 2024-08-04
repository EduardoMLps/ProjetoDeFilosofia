const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = startGame();
var Fps = 60;

//input variables
var canInput = true;

var isMouseClicked = false;
var enterKeyPressed = false;

//game variables
var currentScene = 0;
var sceneHasChang = false;
var sceneStarted = false;

//colors
var luminocityVals = [rgb(0, 0, 0), rgb(51, 51, 51), rgb(102, 102, 102) , rgb(153, 153, 153), rgb(204, 204, 204), rgb(255, 255, 255)];

//Ascii Art
var textSize = 20;

var titleTextAscii = [
    [" _______                                                              "],
    ["!__   __!          _           _     _                                "],
    ["   | |  __   __   | |    __   | |   | !_    __         __   __        "],
    ["   | | |  / /  \\  |  \\  /  \\  | |_  | . `. /. \\       |  \\ / _\\ "],
    ["   |_| |_|  \\___! !__/  \\___! !___! !_!!_| \\__/       !__/ \\__/   "],
    ["      ______  __  __       __    ____    __    _____  __  __          "],
    ["     |  ___/ / / / /    .'   ' .´ __/ .'   '  / ___/ / / /  |         "],
    ["     | |__  / / / /    /     / ._ `  /     / / __/  / / / o |         "],
    ["     |  _/ / / / /__  /     / __/ / /     / / /    / / / _  |         "],
    ["     !_!  /_/ /____/  '.__.' /__.´  '.__.' /_/    /_/ /_/ |_|         "]
];

var EnterAscii = [
    ["<- Aperte enter para continuar ->"]
];
var subTitleAscii = [
    ["sem nome"]
];
var text1Ascii = [
    ["Vugnaes sreo asdfghjklsddafuiasdfaosiu shafbda s ljka fal hawufhka"]
];
var text2Ascii = [
    ["no caminho para seu emprego, você passa na frente de uma loja e se sente interessado em entrar, entraria? (temperança)"]
];
var text3Ascii = [
    ["você passa por alguem e vê a carteira dele caindo do bolso, entregaria para ele a carteira? (justiça)"]
];
var text4Ascii = [
    ["depois de tudo isso, você chegou em seu emprego? (sabedoria)"]
];
var text5Ascii = [
    ["Aeeeee é isso Professor :D pode me dar a nota agora? Pfv :) "]
];

var characterAscii = [
    [" o "],
    ["/|\\"],
    ["/ \\"]
];
var keyAscii = [
    ["F"],
    ["b"]
];

var option1Ascii = [
    ["   _____   "],
    [" '       ' "],
    ["|         |"],
    ["|  -Sim-  |"],
    ["|         |"],
    [" . _____ . "]
];
var option2Ascii = [
    ["   _____   "],
    [" '       ' "],
    ["|         |"],
    ["|  -Não-  |"],
    ["|         |"],
    [" . _____ . "]
];
var creditChoice = [
    ["( ' o ') - Ok, Eduardo Mello Lopes"]
]

var option1SpriteScenes = [null, null, option1Ascii, option1Ascii, option1Ascii, option1Ascii, creditChoice];
var option2SpriteScenes = [null, null, option2Ascii, option2Ascii, option2Ascii, option2Ascii, creditChoice];
var textsSpriteScenes = [null, null, text1Ascii, text2Ascii, text3Ascii, text4Ascii, text5Ascii]

var loadAnim = [
    [[""]],
    [[""]],
    [[""]],
    [[""]],
    [[""]],
    [[""]],
    [["o"]],
    [[""]],
    [["o"]],
    [[""]],
    [["o"]],
    [[""]],
    [["o"]],
    [[""]],
    [["o"]],
];

//objects

var mouse = [
    0,
    0,
    1,
    1,
]

var titleText = [
    parseInt((window.innerWidth * (1/2)) / (textSize / 2)) - 35, //X
    parseInt((window.innerHeight * (1/5)) / textSize) - 1, //Y
    1, //XSize
    1, //YSize
    5, //light color
    titleTextAscii, //Ascii Art
    "start", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "sceneUp", "none"], //functions
];
var loadingDot = [
    parseInt((window.innerWidth * (1/2)) / (textSize / 2)), //X
    parseInt((window.innerHeight * (1/2)) / textSize), //Y
    1, //XSize
    1, //YSize
    5, //light color
    loadAnim[0], //Ascii Art
    "start", //Ascii alignment
    ["load", "none", "none"], //animations (when start, when leave, evt animations...)
    [15, 0, 0], //animations time
    ["sceneUp", "none", "none"], //functions
];
var subTitle = [
    parseInt((window.innerWidth * (1/2)) / (textSize / 2)), //X
    parseInt((window.innerHeight * (2/4)) / textSize), //Y
    1, //XSize
    1, //YSize
    5, //light color
    subTitleAscii, //Ascii Art
    "center", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "none", "none"], //functions
];
var pressEnter = [
    parseInt((window.innerWidth * (1/2)) / (textSize / 2)), //X
    parseInt((window.innerHeight * (7/8)) / textSize), //Y
    1, //XSize
    1, //YSize
    5, //light color
    EnterAscii, //Ascii Art
    "center", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "none", "none"], //functions
];

var text1 = [
    parseInt((window.innerWidth * (1/2)) / (textSize / 2)), //X
    parseInt((window.innerHeight * (1/4)) / textSize), //Y
    1, //XSize
    1, //YSize
    0, //light color
    text1Ascii, //Ascii Art
    "center", //Ascii alignment
    ["writeText", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "SceneUp", "none"], //functions
];

var option1 = [
    parseInt((window.innerWidth * (1/4)) / (textSize / 2)), //X
    24, //Y
    12, //X size
    5, //Y size
    "none", //start animation;
    "none", //type of function
    5, //color
    option1Ascii, //Ascii Art
    "start", //alignment
    4, //time of the animation
    "fadeOut", //leave animation
    "mouse option", //type collision
];
var option2 = [
    parseInt((window.innerWidth * (3/4)) / (textSize / 2)), //X
    24, //Y
    12, //X size
    5, //Y size
    "none", //start animation;
    "none", //type of function
    5, //color
    option2Ascii, //Ascii Art
    "start", //alignment
    4, //time of the animation
    "fadeOut", //leave animation
    "mouse option", //type collision
];
var character = [
    parseInt((window.innerWidth * (1/2)) / (textSize / 2)), //X
    parseInt((window.innerHeight * (1/2)) / textSize), //Y
    1, //XSize
    1, //YSize
    0, //light color
    characterAscii, //Ascii Art
    "start", //Ascii alignment
    ["fadeIn", "fadeOut", "walking"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "none", "none"], //functions
];
var key = [
    parseInt((window.innerWidth * (3/4)) / (textSize / 2)), //X
    parseInt((window.innerHeight * (3/4)) / textSize), //Y
    1, //XSize
    1, //YSize
    5, //light color
    keyAscii, //Ascii Art
    "start", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "none", "none"], //functions
];

var scene0Objects = [titleText.slice(), pressEnter.slice(), subTitle.slice()];
var scene1Objects = [loadingDot];
var scene2Objects = [character, key, text1];

var allScenes = [scene0Objects, scene1Objects, scene2Objects];

var objectsToAnimate = [];

function startGame() {
    canvas.width = window.outerWidth;
    canvas.height = window.outerHeight;
    
    document.addEventListener("mousedown", mouseClick);
    document.addEventListener("mousemove", mouseMove);
    //document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup",keyUp);
    setInterval(frameFunc, 1000 / Fps)
}

function frameFunc() {
    drawnBackground("#000");
    checkInputs();
    iterateObjs();
    iterateAnims();
}

function checkInputs() {
    if(canInput) {
        if(enterKeyPressed && sceneHasChang == false) {
            console.log("enter");
            if(currentScene == 0) {
                sceneHasChang = true;
            }
        }
    }
}

function iterateObjs() {
    for(var i = 0; i<allScenes[currentScene].length; i++) {
        var object = allScenes[currentScene][i]

        if(isMouseClicked) {
            console.log("mouse clicked");
            if(object == character) {
                console.log("found character");
                character[0] = mouse[0];
                character[1] = mouse[1];
            }
        }
        if(sceneHasChang) {
            for(var ai = 0; ai<allScenes[currentScene].length; ai++) {
                objectsToAnimate.push([allScenes[currentScene][ai], allScenes[currentScene][ai][7][1], allScenes[currentScene][ai][8][1], 0, 0, allScenes[currentScene][ai][5]]);
            }
            canInput = false;
            sceneHasChang = false;
        }
        if(sceneStarted) {
            for(var ai = 0; ai<allScenes[currentScene].length; ai++) {
                objectsToAnimate.push([allScenes[currentScene][ai], allScenes[currentScene][ai][7][0], allScenes[currentScene][ai][8][0], 0, 0, allScenes[currentScene][ai][5]]);
            }
            sceneStarted = false;
        }
        //drawnSquare(object);
        drawnText(object);
    }
    isMouseClicked = false;
    enterKeyPressed= false;
    sceneStarted = false;
}

function afterAnim(object, type) {
    console.log(object)
    switch(object[9][object[7].indexOf(type)]) {
        case "sceneUp":
            console.log("sceneUp")
            currentScene++;
            canInput = true;
            sceneStarted = true;
            break;
        case "sceneDown":
            currentScene = 0;
            break;
        case "show Option":
            if(type == "write Text") {
                allScenes[currentScene].push(option1.slice(), option2.slice());
            } else {currentScene++; sceneStarted = true;}
            break;
    }
}

function iterateAnims() {
    for(var a=0; a<objectsToAnimate.length; a++) {
        var property = objectsToAnimate[a];
        var obj = property[0]
        
        var totalFrames = property[2] * Fps;
        property[3] += 1;
        if(property[3] >= totalFrames - 1) {
            afterAnim(obj , property[1]);
            objectsToAnimate = objectsToAnimate.slice(1);
            console.log("STOP")
        } else {
            switch(property[1]) {
                case "anim1":
                    if(property[3] % (totalFrames/titleTextAnim.length) >= (totalFrames/titleTextAnim.length) - 1) {
                        console.log("animation frame");
                        obj[5] = titleTextAnim[property[4]];
                        property[4]++;
                    }
                    break;
                case "fadeOut":
                    if(property[3] % (totalFrames / 6) >= (totalFrames / 6) - 1) {
                        obj[4]--;
                    }
                    break;
                case "fadeIn":
                    if(property[3] % (totalFrames / 6) >= (totalFrames / 6) - 1) {
                        obj[4]++;
                    }
                    break;
                case "load":
                    if(property[3] % (totalFrames / loadAnim.length) >= (totalFrames / loadAnim.length) - 1) {
                        obj[5] = loadAnim[property[4]];
                        property[4]++
                    }
                    break;
                case "writeText":
                    console.log("write it")
                    for(var y = 0; y<property[5].length; y++) {
                        const originalText = property[5][y][0];
                        if(property[3] % (totalFrames / originalText.length / property[5].length) >= (totalFrames / originalText.length / property[5].length) - 1) {
                            var newText = originalText.substring(0, property[4] + 2);
                            console.log(newText);
                            obj[5] = [[newText]];
                            obj[4] = 5;
                            property[4]++;
                        }
                    }
                    break;
                case "walking":
                    totalFrames = property[2]
                    break;
            }
        }
    }
}

function SqrCollision(obj1, obj2) {
    return obj1[0] <= obj2[0] && obj1[1] <= obj2[1] && obj1[0] + obj1[2] >= obj2[0] && obj1[1] + obj1[3] >= obj2[1];
}

//input functions
function mouseClick(evt) {
    switch(evt.button) {
        case 0:
            isMouseClicked = true;
            break;
    }
}
function mouseMove(evt) {
    mouse = [parseInt(evt.x / (textSize / 2)), parseInt(evt.y / textSize), 1, 1];
}
function keyDown(evt) {
    switch(evt.keyCode) {
        case 13:
            enterKeyPressed = true;
            break;
    }
}
function keyUp(evt) {
    switch(evt.keyCode) {
        case 13:
            enterKeyPressed = true;
            break;
    }
}

//render functions
function drawnSquare(obj) {
    ctx.fillStyle = luminocityVals[obj[4]];
    ctx.fillStyle = "red"
    ctx.fillRect(obj[0] * (textSize / 2), obj[1] * textSize, obj[2] * (textSize / 2), obj[3] * textSize);
}
function drawnText(obj) {
    ctx.fillStyle = luminocityVals[obj[4]];
    ctx.textAlign = obj[6];
    ctx.font = textSize + "px Consolas";
    var AsciiArt = obj[5];
    for(var y = 0; y<AsciiArt.length; y++) {
        ctx.fillText(String(AsciiArt[y]), obj[0] * (textSize / 2), (obj[1] * 20) + textSize * y);
    }
}
function drawnBackground(col) {
    ctx.fillStyle = col;
    ctx.fillRect(0,0,window.outerWidth,window.outerHeight);
}

//others
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgb(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}