AFRAME.registerComponent("drive", {
    init: function() {
        var gameStateValue = this.el.getAttribute("game");

        // Console Message
        console.log("Game State from Drive.js: ", gameStateValue)

        if (gameStateValue == "play"){
            this.driveCar()
        }
    },

    driveCar: function(){
        console.log("Drive function reached.")

        var multiply = 0;
        var wheelRotation = -40;

        // KeyDown Event
        window.addEventListener("keydown", function(e) {
            console.log("Key you Pressed:", e)

            // Steering Wheel rotation for right & left keydown
            var wheel = document.querySelector("#control-wheel")
            console.log("Wheel", wheel)

            if (e.code == "ArrowRight" && wheelRotation > -40) {                
                wheelRotation -= 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })

            }
            if (e.code == "ArrowLeft" && wheelRotation < 40) {                
                wheelRotation += 5
                wheel.setAttribute("rotation", { x: 0, y: 0, z: wheelRotation })
            }

            //Camera Movement Control: Rotation & Direction on Right & Left Arrow Keyup
            var cameraRig = document.querySelector("#camera-rig")
            var cameraRotation = cameraRig.getAttribute("rotation")
            var cameraPosition = cameraRig.getAttribute("position")
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")

            console.log(cameraMoveControl.speed)
            cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            console.log(cameraMoveControl.speed)

            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);

            if (e.code == "ArrowRight") {
                cameraRotation.y -= 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })                
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            if (e.code == "ArrowLeft") {
                cameraRotation.y += 5
                cameraRig.setAttribute("rotation", { x: 0, y: cameraRotation.y, z: 0 })             
                cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})

            }

            // Up Arrow Events- Accelerator
            // if (e.code == "ArrowUp") {
            //     multiply += 0.5

            //     if (multiply <= 100 && cameraPosition.z > -500) {
            //         cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
            //         var accelerateCar = document.querySelector("#control-acce")
            //         accelerateCar.setAttribute("material", "color", "green")
            //         var carSpeed = document.querySelector("#speed")
            //         carSpeed.setAttribute("text", {value: multiply})

            //         // cameraRig.setAttribute("position", {x: cameraPosition.x, y: cameraPosition.y, z: cameraPosition.z - 0.5})
            //         // var cam = document.querySelector("#camera")
            //         // camPos = cam.getAttribute("position")
            //         // console.log("Camera Position:", camPos)
            //         // cam.setAttribute("position" , {x: camPos.x, y: camPos.y, z: camPos.z -4})
            //     }

            // }
            if (e.code == "ArrowUp") {
                multiply += 0.5

                if (multiply <= 100 && cameraPosition.z > -500) {    
                    // console.log("Camera move-controls: ", cameraMoveControl)              
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                    var accelerateCar = document.querySelector("#control-acce")
                    accelerateCar.setAttribute("material", "color", "green")
                    var carSpeed = document.querySelector("#speed")
                    carSpeed.setAttribute("text", { value: multiply });
                }

            }

            // Space Events- Break
            if (e.code == "Space") {
                cameraRig.setAttribute("movement-controls", {"speed": 0})
                var stopCar = document.querySelector("#control-break")
                stopCar.setAttribute("material", "color", "red")
            }
        })

        window.addEventListener('keyup', function (e) {

            var cameraRig = document.querySelector("#camera-rig")
            var cameraDirection = new THREE.Vector3();
            cameraRig.object3D.getWorldDirection(cameraDirection);
            var cameraMoveControl = cameraRig.getAttribute("movement-controls")


            if (e.code == "ArrowRight") {
                var wheel = document.querySelector("#control-wheel")
                wheel.setAttribute("rotation", { x: 0, y: 0, z: 0 })

                wheelRotation = 0;
            }

            if (e.code == "ArrowLeft") {
                var wheel = document.querySelector("#control-wheel")
                wheel.setAttribute("rotation", { x: 0, y: 0, z: 0 })

                wheelRotation = 0;
            }

            if (e.code == "ArrowUp") {
                var carSpeed = document.querySelector("#speed")
                carSpeed.setAttribute("text", {value: 0})
                var accelerateCar = document.querySelector("#control-acce")
                accelerateCar.setAttribute("material", "color", "white")

                if (multiply > 0) {
                    multiply -= 0.5
                    cameraRig.setAttribute("movement-controls", {"speed": cameraMoveControl.speed + 0.005})
                }
            }

            if (e.code == "Space") {             
                var startCar = document.querySelector("#control-break")
                startCar.setAttribute("material", "color", "white")
            }
        })

        
    },
})