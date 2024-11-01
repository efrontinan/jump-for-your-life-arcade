class Player {
    constructor(gameSize, platformSpecs) {

        this.gameSize = gameSize

        this.playerSize = {
            width: 120,
            height: 120
        }

        this.playerPos = {
            left: this.gameSize.width / 2 - this.playerSize.width,
            top: this.gameSize.height - this.playerSize.height - 5,
            base: this.gameSize.height - this.playerSize.height - 5
        }

        this.distance = platformSpecs.distance

        this.platformSize = {
            width: platformSpecs.width,
            height: platformSpecs.height
        }

        this.init()
    }

    init() {

        this.player = document.createElement('img')
        this.player.src = "./img/kimi-yip-evil-ghost-norm.gif"

        this.player.id = "player"
        this.player.style.zIndex = "2"
        this.player.style.position = "absolute"
        this.player.style.width = `${this.playerSize.width}px`
        this.player.style.height = `${this.playerSize.height}px`
        this.player.style.left = `${this.playerPos.left}px`
        this.player.style.top = `${this.playerPos.top}px`

        document.querySelector("#game-screen").appendChild(this.player)

    }

    createMovementLimitFrame() {
        const movementLimitFrame = document.createElement('div')

        movementLimitFrame.id = 'movement-limit-frame'
        movementLimitFrame.style.position = 'absolute'
        movementLimitFrame.style.left = `${(this.playerPos.left) - (this.distance + this.platformSize.width)}px`
        movementLimitFrame.style.top = `${(this.playerPos.top) - (this.gameSize.height / 5) - 100}px`
        movementLimitFrame.style.width = `${(this.gameSize.width) - this.platformSize.width}px`
        movementLimitFrame.style.height = `${this.gameSize.height}px`
        movementLimitFrame.style.border = '2px solid yellow'
        movementLimitFrame.style.boxSizing = 'border-box'

        document.querySelector("#game-screen").appendChild(movementLimitFrame)
    }

    moveLeft() {
        this.playerPos.top -= this.gameSize.height / 5
        this.playerPos.left -= (this.distance + this.platformSize.width)
        this.moveSound()
    }

    moveUp() {
        this.playerPos.top -= this.gameSize.height / 5
        this.moveSound()

    }

    moveRight() {
        this.playerPos.top -= this.gameSize.height / 5
        this.playerPos.left += (this.distance + this.platformSize.width)
        this.moveSound()
    }

    resetPosition() {

        this.player.style.transition = "top 0s"

        this.playerPos = {
            left: this.gameSize.width / 2 - this.playerSize.width,
            top: this.gameSize.height - this.playerSize.height - 20
        }

        this.player.style.left = `${this.playerPos.left}px`;
        this.player.style.top = `${this.playerPos.top}px`;
    }

    updatePosition(currentPlatform) {

        if (!(this.playerPos.top === this.gameSize.height - this.playerSize.height - 20)) {

            this.playerPos.left = currentPlatform[0].platformPos.left + (this.platformSize.width - this.playerSize.width) / 2
            this.player.style.left = `${this.playerPos.left}px`

            this.playerPos.top = currentPlatform[0].platformPos.top + (this.platformSize.height - this.playerSize.height) / 2
            this.player.style.top = `${this.playerPos.top}px`
            this.player.style.transition = "top 1s"
        }
    }

    moveSound() {
        const audioElement = document.createElement("audio");
        audioElement.src = "audio/soundJump.mp3"
        audioElement.play()
    }
}