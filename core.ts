interface ControllerNavigate {
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
    var controllerData: ControllerNavigate;
    controller = navigator.getGamepads()[0];
    if  ("id" in controller && controller["id"] == "Xbox 360 Controller (STANDARD GAMEPAD Vendor: 045e Product: 028e)"){
        if ("axes" in controller && "buttons" in controller){
            buttons = controller["buttons"];
            if (controller["axes"].length > 3){
                if (4 in buttons && 5 in buttons && 6 in buttons && 7 in buttons){
                    controllerData = {
                        clickLeft: controller.buttons[4].value,
                        clickRight: controller.buttons[5].value,
                        down: controller.buttons[6].value,
                        leftStickHorizontal: controller.axes[0],
                        leftStickVertical: controller.axes[1],
                        rightStickHorizontal: controller.axes[2],
                        rightStickVertical: controller.axes[3],
                        up: controller.buttons[7].value
                    }
                    controllerAction(controllerData);
                }
            }
        } 
    }
}

function controllerAction(controllerData: ControllerNavigate){
    var output = document.getElementById("test");
    if (output){
        output.innerHTML = JSON.stringify(controllerData, null, 4);
    }
}