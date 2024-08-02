const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = startGame();
var Fps = 60;

//input variables
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

var frame1 = [
    ["_______"],
    ["!__   __!          _           _     _                 "],
    ["   ! !  __   __   ! !    __   ! !   ! !_    __         __   __"],
    [""],
    ["   !_! |_|  \___! !__/  \___! !___! !_!!_| \__/       !__/ \__/"],
    ["      ______  __  __       __    ____    __    _____  __  __"],
    ["     |  ___/ / / / /    .'   '  ´ __/ .'   '  / ___/ / / /  |"],
    ["     ! !..  : : : :    :     : .. `  :     : : ..:  : : : o !"],
    [""],
    ["     !_!  /_/ /____/  '.__.' /__.´  '.__.' /_/    /_/ /_/ |_|"],
];
var frame2 = [
    ["_______"],
    ["!..   ..!          _           _     _                 "],
    [""],
    [""],
    ["    _   _    ___   __    ___   ___   _  _   __         __   __"],
    ["      ______  __  __       __    ____    __    _____  __  __"],
    ["     !  ...: : : : :     '   '  ´ ..:  '   '  : ...: : : :  !"],
    [""],
    [""],
    ["      _    _   ____     __    __      __    _      _   _   _ "],
];
var frame3 = [
    ["......."],
    [""],
    [""],
    [""],
    [""],
    ["......  ..  ..       ..    ....    ..    .....  ..  .."],
   
   
   
   
];
var frame4 = [
    [", , , ,"],
    [""],
    [""],
    [""],
    [""],
    [", , ,   ,   ,        ,       ,     ,    , , ,   ,   ,"],
  
  
  
  
];
var titleText = [
    [" _______"],
    ["!__   __!          _           _     _"],
    ["   | |  __   __   | |    __   | |   | !_    __         __   __"],
    ["   | | |  / /  \\  |  \\  /  \\  | |_  | . `. /. \\       |  \\ / _\\ "],
    ["   |_| |_|  \\___! !__/  \\___! !___! !_!!_| \\__/       !__/ \\__/"],
    ["      ______  __  __       __    ____    __    _____  __  __"],
    ["     |  ___/ / / / /    .'   ' .´ __/ .'   '  / ___/ / / /  |"],
    ["     | |__  / / / /    /     / ._ `  /     / / __/  / / / o |"],
    ["     |  _/ / / / /__  /     / __/ / /     / / /    / / / _  |"],
    ["     !_!  /_/ /____/  '.__.' /__.´  '.__.' /_/    /_/ /_/ |_|"]
];
var titleTextAnim = [titleText, frame1, frame2, frame3, frame4];

var Enter = [
    ["<- Aperte enter para continuar ->"]
];
var sub = [
    ["sem nome"]
];
var text1Ascii = [
    ["Você acorda em seu quarto, você sente um mal presságio hoje, você iria para seu emprego? (coragem)"]
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

var title = [
    (window.innerWidth / 2) / (textSize / 2) - 38, //X
    2, //Y
    76, //X size
    10, //Y size
    "fadeIn", //animation start
    "sceneUp", //type of function
    5, //color
    titleText, //Ascii Text
    "start",
    5,
    "anim1"
];
var object2 = [
    (window.innerWidth / 2) / (textSize / 2) - 1, //X
    (window.innerHeight / 2) / (textSize) - 1, //Y
    1, //X size
    1, //Y size
    "load", //animation start
    "sceneUp", //type of function
    5, //color
    loadAnim[5],
    "start",
    20,
    "fadeOut"
];
var subTitle = [
    (window.innerWidth / 2) / (textSize / 2), //X
    14, //Y
    9, //X size
    1, //Y size
    "fadeIn", //start animation
    "none", //type of function
    5, //color
    sub,
    "center",
    5,
    "fadeOut"
];
var pressEnterObj = [
    (window.innerWidth / 2) / (textSize / 2), //X
    28, //Y
    9, //X size
    1, //Y size
    "fadeIn", //start animation;
    "none", //type of function
    5, //color
    Enter, //Ascii Art
    "center", //alignment
    5,
    "fadeOut"
];

var text1 = [
    (window.innerWidth / 2) / (textSize / 2), //X
    5, //Y
    1, //X size
    1, //Y size
    "write Text", //start animation;
    "show Option", //type of function
    0, //color
    text1Ascii, //Ascii Art
    "center", //alignment
    4, //time of the animation
    "fadeOut",
];

var option1 = [
    (window.innerWidth * (1/4)) / (textSize / 2), //X
    24, //Y
    12, //X size
    5, //Y size
    "fadeOut", //start animation;
    "none", //type of function
    5, //color
    option1Ascii, //Ascii Art
    "start", //alignment
    4, //time of the animation
    "fadeOut", //leave animation
    "mouse option", //type collision
];
var option2 = [
    (window.innerWidth * (3/4)) / (textSize / 2), //X
    24, //Y
    12, //X size
    5, //Y size
    "fadeOut", //start animation;
    "none", //type of function
    5, //color
    option2Ascii, //Ascii Art
    "start", //alignment
    4, //time of the animation
    "fadeOut", //leave animation
    "mouse option", //type collision
];

var scene0Objects = [title.slice(), pressEnterObj.slice(), subTitle.slice()];
var scene1Objects = [object2.slice()];
var scene2Objects = [text1];
var scene3Objects = [text1];
var scene4Objects = [text1];
var scene5Objects = [text1];
var scene6Objects = [text1];

var allScenes = [scene0Objects, scene1Objects, scene2Objects, scene3Objects, scene4Objects, scene5Objects, scene6Objects];

var animationId = null;
var aniI = 1;
var frame = 0;

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
    iterateObjs();
    iterateAnims();
}

function iterateObjs() {
    for(var i = 0; i<allScenes[currentScene].length; i++) {
        var object = allScenes[currentScene][i]

        if(SqrCollision(object, mouse) && isMouseClicked) {
            console.log("mouse clicked object");
            switch(object[11]) {
                case "mouse option":
                    object[5] = "none";
                    sceneHasChang = true;
                    break;
            }
        }

        if(enterKeyPressed && sceneHasChang == false) {
            if(currentScene == 0) {
                sceneHasChang = true;
            }
        }
        if(sceneHasChang) {
            for(var ai = 0; ai<allScenes[currentScene].length; ai++) {
                objectsToAnimate.push([allScenes[currentScene][ai], "fadeOut", allScenes[currentScene][ai][9], 0, 0, allScenes[currentScene][ai][7]]);
            }
            sceneHasChang = false;
        }
        if(sceneStarted) {
            option1[7] = option1SpriteScenes[currentScene];
            option2[7] = option2SpriteScenes[currentScene];
            text1[7] = textsSpriteScenes[currentScene];
            objectsToAnimate.push([object, object[4], object[9], 0, 0, object[7]]);
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
    switch(object[5]) {
        case "sceneUp":
            console.log("sceneUp")
            currentScene++;
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
            //console.log(property[3]);
            //console.log(property[1])
            switch(property[1]) {
                case "anim1":
                    if(property[3] % (totalFrames/titleTextAnim.length) >= (totalFrames/titleTextAnim.length) - 1) {
                        console.log("animation frame");
                        obj[7] = titleTextAnim[property[4]];
                        property[4]++;
                    }
                    break;
                case "fadeOut":
                    if(property[3] % (totalFrames / 6) >= (totalFrames / 6) - 1) {
                        obj[6]--;
                    }
                    break;
                case "fadeIn":
                    if(property[3] % (totalFrames / 6) >= (totalFrames / 6) - 1) {
                        obj[6]++;
                    }
                    break;
                case "load":
                    if(property[3] % (totalFrames / loadAnim.length) >= (totalFrames / loadAnim.length) - 1) {
                        obj[7] = loadAnim[property[4]];
                        property[4]++
                    }
                    break;
                case "write Text":
                    for(var y = 0; y<property[5].length; y++) {
                        const originalText = property[5][y][0];
                        if(property[3] % (totalFrames / originalText.length / property[5].length) >= (totalFrames / originalText.length / property[5].length) - 1) {
                            var newText = originalText.substring(0, property[4] + 2);
                            console.log(newText);
                            obj[7] = [[newText]];
                            obj[6] = 5;
                            property[4]++;
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
    ctx.fillStyle = luminocityVals[obj[6] - 1];
    ctx.fillStyle = "red"
    ctx.fillRect(obj[0] * (textSize / 2), obj[1] * textSize, obj[2] * (textSize / 2), obj[3] * textSize);
}
function drawnText(obj) {
    ctx.fillStyle = luminocityVals[obj[6]];
    ctx.textAlign = obj[8];
    ctx.font = textSize + "px Consolas";
    var AsciiArt = obj[7];
    for(var y = 0; y<AsciiArt.length; y++) {
        ctx.fillText(AsciiArt[y], obj[0] * (textSize / 2), (obj[1] * 20) + textSize * y);
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