// @ts-ignore
var rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;
gameLoop();
function gameLoop() {
    gamepadStart();
    var start = rAF(gameLoop);
}
;
function gamepadStart() {
    var buttons = {};
    var controller;
    var controllerData;
    var deadZoneData;
    // @ts-ignore
    controller = navigator.getGamepads();
    if (controller) {
        Object.keys(controller).forEach(function (key) {
            if (controller[key]) {
                if ("id" in controller[key] && controller[key]["id"].includes("(STANDARD GAMEPAD Vendor: 045e Product: 028e)")) {
                    if ("axes" in controller[key] && "buttons" in controller[key]) {
                        buttons = controller[key]["buttons"];
                        if (controller[key]["axes"].length > 3) {
                            if (4 in buttons && 5 in buttons && 6 in buttons && 7 in buttons) {
                                controllerData = {
                                    clickLeft: controller[key].buttons[4].value,
                                    clickRight: controller[key].buttons[5].value,
                                    down: controller[key].buttons[6].value,
                                    leftStickHorizontal: controller[key].axes[0],
                                    leftStickVertical: controller[key].axes[1],
                                    rightStickHorizontal: controller[key].axes[2],
                                    rightStickVertical: controller[key].axes[3],
                                    up: controller[key].buttons[7].value
                                };
                                if (navigator.platform == "Linux x86_64") {
                                    deadZoneData = {
                                        clickLeft: controllerData["clickLeft"],
                                        clickRight: controllerData["clickRight"],
                                        down: controllerData["down"],
                                        leftStickHorizontal: calculateDeadzone(controllerData["leftStickHorizontal"]),
                                        leftStickVertical: calculateDeadzone(controllerData["leftStickVertical"]),
                                        rightStickHorizontal: calculateDeadzone(controllerData["rightStickHorizontal"]),
                                        rightStickVertical: calculateDeadzone(controllerData["rightStickVertical"]),
                                        up: controllerData["up"]
                                    };
                                    controllerAction(deadZoneData);
                                }
                                else {
                                    controllerAction(controllerData);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
}
function calculateDeadzone(input) {
    var deadZone = 0.15;
    var output = 0;
    if (input < 0) {
        if (input > (deadZone * -1)) {
            output = 0;
        }
        else {
            output = (input + deadZone) / (1 + deadZone);
        }
    }
    else {
        if (input < deadZone) {
            output = 0;
        }
        else {
            output = (input - deadZone) / (1 - deadZone);
        }
    }
    return (output);
}
function controllerAction(controllerData) {
    var output = document.getElementById("test");
    if (output) {
        output.innerHTML = JSON.stringify(controllerData, null, 4);
    }
}
