const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//1366X
//728Y
const canvasX = 1366;
const canvasY = 728;

window.onload = startGame();
var Fps = 60;

//input variables
var canInput = true;

var isMouseClicked = false;
var enterKeyPressed = false;

//game variables
var currentScene = 0;
var sceneHasChang = false;
var sceneStarted = true;

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

//Animations
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
var walkingAnimRight = [
    [[" o "],
     ["/|\\"],
     [" >\\"]],
    [[" o "],
     ["/|\\"],
     [" |\\"]],
    [[" o "],
     ["/|\\"],
     [" |>"]],
    [[" o "],
     ["/|\\"],
     ["/ \\"]]
];
var walkingAnimLeft = [
    [[" o "],
     ["/|\\"],
     ["/< "]],
    [[" o "],
     ["/|\\"],
     ["/| "]],
    [[" o "],
     ["/|\\"],
     ["<| "]],
    [[" o "],
     ["/|\\"],
     ["/ \\"]]
];

//objects

var mouse = [
    0,
    0,
    1,
    1,
]

var titleText = [
    parseInt((canvasX * (1/2)) / (textSize / 2)) - 35, //X
    parseInt((canvasY * (1/5)) / textSize) - 1, //Y
    1, //XSize
    1, //YSize
    0, //light color
    titleTextAscii, //Ascii Art
    "start", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "sceneUp", "none"], //functions
];
var loadingDot = [
    parseInt((canvasX * (1/2)) / (textSize / 2)), //X
    parseInt((canvasY * (1/2)) / textSize), //Y
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
    parseInt((canvasX * (1/2)) / (textSize / 2)), //X
    parseInt((canvasY * (2/4)) / textSize), //Y
    1, //XSize
    1, //YSize
    0, //light color
    subTitleAscii, //Ascii Art
    "center", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "none", "none"], //functions
];
var pressEnter = [
    parseInt((canvasX * (1/2)) / (textSize / 2)), //X
    parseInt((canvasY * (7/8)) / textSize), //Y
    1, //XSize
    1, //YSize
    0, //light color
    EnterAscii, //Ascii Art
    "center", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [2, 2, 0], //animations time
    ["none", "none", "none"], //functions
];

var text1 = [
    parseInt((canvasX * (1/2)) / (textSize / 2)), //X
    parseInt((canvasY * (1/6)) / textSize), //Y
    1, //XSize
    1, //YSize
    0, //light color
    text1Ascii, //Ascii Art
    "center", //Ascii alignment
    ["writeText", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [8, 2, 0], //animations time
    ["none", "SceneUp", "none"], //functions
];

var character = [
    parseInt((canvasX * (1/2)) / (textSize / 2)), //X
    parseInt((canvasY * (1/2)) / textSize), //Y
    1, //XSize
    1, //YSize
    0, //light color
    characterAscii, //Ascii Art
    "start", //Ascii alignment
    ["fadeIn", "fadeOut", "walking"], //animations (when start, when leave, evt animations...)
    [4, 2, 0.5], //animations time
    ["none", "none", "walk end"], //functions
    [3], //Other propertys
];
var key = [
    parseInt((canvasX * (3/4)) / (textSize / 2)), //X
    parseInt((canvasY * (3/4)) / textSize), //Y
    1, //XSize
    1, //YSize
    0, //light color
    keyAscii, //Ascii Art
    "start", //Ascii alignment
    ["fadeIn", "fadeOut", "none"], //animations (when start, when leave, evt animations...)
    [4, 2, 0], //animations time
    ["none", "none", "none"], //functions
];

var scene0Objects = [titleText.slice(), pressEnter.slice(), subTitle.slice()];
var scene1Objects = [loadingDot];
var scene2Objects = [character, key, text1];

var allScenes = [scene0Objects, scene1Objects, scene2Objects];

var objectsToAnimate = [];

function startGame() {
    canvas.width = canvasX;
    canvas.height = canvasY;
    
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

        if(isMouseClicked && canInput) {
            if(object == character) {
                objectsToAnimate.push([object, object[7][2], object[8][2], 0, 0, object[5], object[0], object[1]]);
                canInput = false;
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
    switch(object[9][object[7].indexOf(type)]) {
        case "sceneUp":
            console.log("sceneUp")
            currentScene++;
            canInput = true;
            sceneStarted = true;
            break;
        case "sceneDown":
            currentScene--;
            canInput = true;
            sceneStarted = true;
            break;
        case "walk end":
            object[5] = walkingAnimLeft[3];
            canInput = true;
            break;
    }
}

function iterateAnims() {
    for(var a=0; a<objectsToAnimate.length; a++) {
        var property = objectsToAnimate[a];
        var obj = property[0]
        switch(property[1]){
            case "walking":
                var totalFrames = (property[2] * Fps) * Math.sqrt((property[6] - mouse[0]) * (property[6] - mouse[0]) + (property[7] - mouse[1]) * (property[7] - mouse[1]));
                break;
            case "fadeOut":
            case "fadeIn":
            case "load":
            case "writeText":
            case "anim1":
                var totalFrames = property[2] * Fps;
                break;
        }
        property[3] += 1;
        if(property[3] >= totalFrames - 1) {
            afterAnim(obj , property[1]);
            objectsToAnimate = objectsToAnimate.slice(1);
            console.log("STOP")
        } else {
            switch(property[1]) {
                case "anim1":
                    if(property[3] % (totalFrames/titleTextAnim.length) >= (totalFrames/titleTextAnim.length) - 1) {
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
                    for(var y = 0; y<property[5].length; y++) {
                        const originalText = property[5][y][0];
                        if(property[3] % (totalFrames / originalText.length / property[5].length) >= (totalFrames / originalText.length / property[5].length) - 1) {
                            var newText = originalText.substring(0, property[4] + 2);
                            obj[5] = [[newText]];
                            obj[4] = 5;
                            property[4]++;
                        }
                    }
                    break;
                case "walking":
                    if(property[3] % (property[2] * Fps) >= (property[2] * Fps) - 1) {
                        obj[0] -= objDirections(obj, mouse)[0]; obj[1] -= objDirections(obj, mouse)[1];
                        var Ascii = null;
                        if(objDirections(obj, mouse)[0] > 0) {
                            Ascii = walkingAnimLeft[property[4]];
                        }  else {Ascii = walkingAnimRight[property[4]];}
                        obj[5] = Ascii;
                        if(property[4] >= Ascii.length) {
                            property[4] = 0;
                        } else {
                            property[4]++
                        }
                    }
                    break;
            }
        }
    }
}

function SqrCollision(obj1, obj2) {
    return obj1[0] <= obj2[0] && obj1[1] <= obj2[1] && obj1[0] + obj1[2] >= obj2[0] && obj1[1] + obj1[3] >= obj2[1];
}
function objDirections(obj1, obj2) {
    vector = [0, 0];
    if(obj1[0] < obj2[0]) {
        vector[0] = -1;
    } else if(obj1[0] > obj2[0]) {
        vector[0] = 1;
    } else {
        vector[0] = 0;
    }

    if(obj1[1] < obj2[1]) {
        vector[1] = -1;
    } else if(obj1[1] > obj2[1]) {
        vector[1] = 1;
    } else {
        vector[1] = 0;
    }
    return vector;
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
    if(canInput) {
        mouse = [parseInt(evt.x / (textSize / 2)), parseInt(evt.y / textSize), 1, 1];
    }
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
    ctx.font = textSize + "px Courier";
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