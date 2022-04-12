AFRAME.registerComponent("game", {
    schema: {
        gameState: { type: "string", default: "play" },
    },
    init: function (){
        // Console Message
        console.log("Game State:", this.schema.gameState)
    }
})