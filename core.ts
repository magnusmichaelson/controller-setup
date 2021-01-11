interface controllerNavigate {
    clickLeft: number;
    clickRight: number;
    down: number;
    leftStickHorizontal: number;
    leftStickVertical: number;
    rightStickHorizontal: number;
    rightStickVertical: number;
    up: number;
}

var controllerActive = false;
// @ts-ignore
var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
// @ts-ignore
var rAFStop = window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.cancelRequestAnimationFrame;
window.addEventListener("gamepadconnected", function() {
    controllerActive = true;
});
window.addEventListener("gamepaddisconnected", function() {
    controllerActive = false;
});

gameLoop();

function gameLoop() {
    if (controllerActive){
        gamepadStart();
    }
    var start = rAF(gameLoop);
};

function gamepadStart(){
    if (navigator.platform == "MacIntel"){
        controllerMac(0);
    }
}

function controllerMac(delta: number){
    var buttons: Record<string,number> = {};
    var controller: any;
    var navigate: controllerNavigate;
    controller = navigator.getGamepads()[0];
    if  ("id" in controller && controller["id"] == "Xbox 360 Controller (STANDARD GAMEPAD Vendor: 045e Product: 028e)"){
        if ("axes" in controller && "buttons" in controller){
            buttons = controller["buttons"];
            if (controller["axes"].length > 3){
                if (4 in buttons && 5 in buttons && 6 in buttons && 7 in buttons){
                    navigate = {
                        clickLeft: controller.buttons[4].value,
                        clickRight: controller.buttons[5].value,
                        down: controller.buttons[6].value,
                        leftStickHorizontal: controller.axes[0],
                        leftStickVertical: controller.axes[1],
                        rightStickHorizontal: controller.axes[2],
                        rightStickVertical: controller.axes[3],
                        up: controller.buttons[7].value
                    }
                    controllerAction(navigate, delta);
                }
            }
        } 
    }
}

function controllerAction(navigate: controllerNavigate, delta: number){
    var output = document.getElementById("test");
    if (output){
        output.innerHTML = "";
        output.innerHTML += "Left stick horizontal  " + navigate["leftStickHorizontal"] + "<br/>";
        output.innerHTML += "Left stick vertical    " + navigate["leftStickVertical"] + "<br/>";
        output.innerHTML += "Right stick horizontal " + navigate["rightStickHorizontal"] + "<br/>";
        output.innerHTML += "Right stick vertical   " + navigate["rightStickVertical"] + "<br/>";
        output.innerHTML += "Up                     " + navigate["up"] + "<br/>";
        output.innerHTML += "Down                   " + navigate["down"] + "<br/>";
        output.innerHTML += "Left click             " + navigate["clickLeft"] + "<br/>";
        output.innerHTML += "Right click            " + navigate["clickRight"] + "<br/>";
        output.innerHTML += "<br/>";
    }
}

function gamePadExtra(gamePad: any){
    var output = document.getElementById("test");
    for (var axisCount = 0; axisCount < gamePad["axes"].length; axisCount++){
        if (output){
            output.innerHTML += "axis " + axisCount + " " + gamePad["axes"][axisCount] + "<br/>";
        }
    }
    Object.keys(gamePad["buttons"]).forEach(function(buttonKey){
        if (output){
            output.innerHTML += "button " + buttonKey + " " + JSON.stringify(gamePad["buttons"][buttonKey]["value"]) + "<br/>";
        }
    })
}