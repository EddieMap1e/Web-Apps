cc.Class({
    extends: cc.Component,

    properties: {
        bird: cc.Node,
        flyAudio: cc.AudioSource,
        downSpeed: 5,
        bg: cc.Node,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
    },

    start() {
        this.alive = true;
    },

    update(dt) {
        if (this.bird.angle > -80) this.bird.angle -= 2;
        this.bird.y -= this.downSpeed;
        this.downSpeed += 0.5;
    },

    fly() {
        if (!this.alive) return;
        this.flyAudio.pause();
        this.bird.angle = 30;
        this.downSpeed = -8;
        this.flyAudio.play();
    },

    onCollisionEnter(other, self) {
        this.alive = false;
        this.bg.getComponent('game').gameOver();
    },
});