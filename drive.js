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

        var multiply = 10;
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
        })

        window.addEventListener('keyup', function (e) {
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
        })

        
    },
})