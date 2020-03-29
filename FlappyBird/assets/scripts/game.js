const moveSpeed = 6;

cc.Class({
    extends: cc.Component,

    properties: {
        bird: cc.Node,
        bg: cc.Node,
        ground: cc.Node,
        pipePrefab: cc.Prefab,
        scoreAudio: cc.AudioSource,
        dieAudio: cc.AudioSource,
        scoreLabel: cc.Label,
    },

    start() {
        this.addEventListener();
        this.init();
    },

    update(dt) {
        this.pipe1.x -= moveSpeed;
        this.pipe2.x -= moveSpeed;
        this.ground.x -= moveSpeed;
        if (this.pipe1.x < -450) {
            this.updatePipeY();
            this.pipe1.setPosition(500, this.pipeY, 0);
            this.ground.x = 0;
            this.goal1 = false;
        } else if (this.pipe2.x < -450) {
            this.updatePipeY();
            this.pipe2.setPosition(500, this.pipeY, 0);
            this.goal2 = false;
        }
        if (!this.goal1 && this.pipe1.x < -240) {
            this.updateScore();
            this.scoreAudio.play();
            this.goal1 = true;
        } else if (!this.goal2 && this.pipe2.x < -240) {
            this.updateScore();
            this.scoreAudio.play();
            this.goal2 = true;
        }
    },

    addEventListener() {
        this.bg.on('touchstart', (event) => {
            this.bird.getComponent('bird').fly();
        });
    },

    init() {
        this.score = 0;
        this.goal1 = false;
        this.goal2 = false;
        this.bg.zIndex = 10;
        this.ground.zIndex = 12;
        this.bird.zIndex = 13;
        this.scoreLabel.node.zIndex = 14;
        this.pipe1 = cc.instantiate(this.pipePrefab);
        this.pipe2 = cc.instantiate(this.pipePrefab);
        this.pipeY = this.getRangeInt(400, 1000);
        this.pipe1.setPosition(400, this.pipeY, 0);
        this.updatePipeY();
        this.pipe2.setPosition(900, this.pipeY, 0);
        this.bg.addChild(this.pipe1, 11);
        this.bg.addChild(this.pipe2, 11);
    },

    getRangeInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    updatePipeY() {
        this.pipeY = this.pipeY + this.getRangeInt(-300, 300);
        if (this.pipeY > 1000) this.pipeY = 950;
        else if (this.pipeY < 400) this.pipeY = 450;
    },

    updateScore() {
        this.score++;
        this.scoreLabel.string = '分数 : ' + this.score;
    },

    gameOver() {
        cc.director.pause();
        this.dieAudio.play();
        cc.sys.localStorage.setItem('score', this.score);
        setTimeout(() => {
            cc.director.resume();
            cc.director.loadScene('gameover');
        }, 3000);
    },
});