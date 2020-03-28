const MIN_LENGTH = 50;
const UP = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
const MOVE_SPEED = 0.1;

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        score: 0,
        blockPrefab: cc.Prefab,
        gap: 20,
        row: 4,
        bg: cc.Node,
    },

    start() {
        this.row=parseInt(cc.sys.localStorage.getItem('gameMode'));
        this.drawBgBlocks();
        this.init();
        this.addEventListener();
    },

    drawBgBlocks() {
        this.blockSize = (cc.winSize.width - this.gap * (this.row + 1)) / this.row;
        let x = this.gap + this.blockSize / 2;
        let y = this.blockSize;
        this.position = [];
        for (let i = 0; i < this.row; i++) {
            this.position.push([]);
            for (let j = 0; j < this.row; j++) {
                this.position[i].push(0);
            }
            for (let j = 0; j < this.row; j++) {
                let block = cc.instantiate(this.blockPrefab);
                block.width = this.blockSize;
                block.height = this.blockSize;
                this.bg.addChild(block);
                block.setPosition(cc.Vec2(x, y));
                this.position[i][j] = [x, y];
                x += this.gap + this.blockSize;
                block.getComponent('block').setNumber(0);
            }
            y += this.gap + this.blockSize;
            x = this.gap + this.blockSize / 2;
        }
    },

    init() {
        this.updateScore(0);
        if (this.blocks) {
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.row; j++) {
                    if (this.blocks[i][j] != null) {
                        this.blocks[i][j].destroy();
                    }
                }
            }
        }
        this.data = [];
        this.blocks = [];
        for (let i = 0; i < this.row; i++) {
            this.blocks.push([]);
            this.data.push([]);
            for (let j = 0; j < this.row; j++) {
                this.blocks[i].push(null);
                this.data[i].push(0);
            }
        }
        for (let i = 0; i < 3; i++) {
            this.addBlock();
        }
    },

    updateScore(number) {
        this.score = number;
        this.scoreLabel.string = '分数 : ' + number
    },

    getEmptyPos() {
        let pos = [];
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.row; j++) {
                if (this.data[i][j] == 0) {
                    pos.push([i, j]);
                }
            }
        }
        return pos;
    },

    addBlock() {
        let empty = this.getEmptyPos();
        if (empty.length == 0) return;
        let pos = empty[Math.floor(Math.random() * empty.length)];
        let block = cc.instantiate(this.blockPrefab);
        block.width = this.blockSize;
        block.height = this.blockSize;
        this.bg.addChild(block);
        let x = this.position[pos[0]][pos[1]][0];
        let y = this.position[pos[0]][pos[1]][1];
        block.setPosition(cc.Vec2(x, y));
        let num = Math.random() <= 0.5 ? 2 : 4;
        block.getComponent('block').setNumber(num);
        this.data[pos[0]][pos[1]] = num;
        this.blocks[pos[0]][pos[1]] = block;
    },

    addEventListener() {
        this.bg.on('touchstart', (event) => {
            this.startPoint = event.getLocation();
        })
        this.bg.on('touchend', (event) => {
            this.touchEnd(event);
        })
        this.bg.on('touchcancel', (event) => {
            this.touchEnd(event);
        })
    },

    touchEnd(event) {
        this.endPoint = event.getLocation();
        let vec = this.endPoint.subSelf(this.startPoint);
        if (cc.Vec2.len(this.endPoint, this.startPoint) > MIN_LENGTH) {
            if (Math.abs(vec.x) > Math.abs(vec.y)) {
                if (vec.x > 0) {
                    this.moveDir(RIGHT);
                } else {
                    this.moveDir(LEFT);
                }
            } else {
                if (vec.y > 0) {
                    this.moveDir(UP);
                } else {
                    this.moveDir(DOWN);
                }
            }
        }
    },

    checkFail(){
        for(let i=0;i<this.row;i++){
            for(let j=0;j<this.row;j++){
                let n=this.data[i][j];
                if(n==0)return false;
                if(j>0&&this.data[i][j-1]==n)return false;
                if(j<this.row-1&&this.data[i][j+1]==n)return false;
                if(i>0&&this.data[i-1][j]==n)return false;
                if(i<this.row-1&&this.data[i+1][j]==n)return false;
            }
        }
        return true;
    },

    gameOver(){
        cc.sys.localStorage.setItem("failScore",this.score);
        cc.director.loadScene('gameOver');
    },

    afterMove(hasMoved) {
        if (hasMoved) {
            this.addBlock();
            this.updateScore(this.score + 1);
        }
        if(this.checkFail()){
            this.gameOver();
        }
    },

    moveBlock(block, position, callback) {
        let action = cc.moveTo(MOVE_SPEED, position);
        let finish = cc.callFunc(() => {
            callback && callback();
        });
        block.runAction(cc.sequence(action, finish));
    },

    moveDir(direction) {
        let toMove = [];
        var dx = 0,
            dy = 0,
            xEnd = -1,
            yEnd = -1;
        if (direction == UP) {
            dx = 1;
            xEnd = this.row - 1;
            for (let i = this.row - 1; i >= 0; i--)
                for (let j = 0; j < this.row; j++)
                    toMove.push([i, j]);
        } else if (direction == DOWN) {
            dx = -1;
            xEnd = 0;
            for (let i = 0; i < this.row; i++)
                for (let j = 0; j < this.row; j++)
                    toMove.push([i, j]);
        } else if (direction == LEFT) {
            dy = -1;
            yEnd = 0;
            for (let i = 0; i < this.row; i++)
                for (let j = 0; j < this.row; j++)
                    toMove.push([i, j]);
        } else if (direction == RIGHT) {
            dy = 1;
            yEnd = this.row - 1;
            for (let i = 0; i < this.row; i++)
                for (let j = this.row - 1; j >= 0; j--)
                    toMove.push([i, j]);
        }

        let hasMoved = false;

        let move = (x, y, callback) => {
            if (x == xEnd || y == yEnd || this.data[x][y] == 0) {
                callback && callback();
                return;
            } else if (this.data[x + dx][y + dy] == 0) {
                let block = this.blocks[x][y];
                let pos = this.position[x + dx][y + dy];
                this.blocks[x + dx][y + dy] = block;
                this.data[x + dx][y + dy] = this.data[x][y];
                this.blocks[x][y] = null;
                this.data[x][y] = 0;
                this.moveBlock(block, cc.Vec2(pos[0], pos[1]), () => {
                    move(x + dx, y + dy, callback);
                });
                hasMoved = true;
            } else if (this.data[x + dx][y + dy] == this.data[x][y]) {
                let block = this.blocks[x][y];
                let pos = this.position[x + dx][y + dy];
                this.data[x + dx][y + dy] <<= 1;
                this.updateScore(this.score + this.data[x + dx][y + dy]);
                this.blocks[x + dx][y + dy].getComponent('block').setNumber(this.data[x + dx][y + dy]);
                this.blocks[x][y] = null;
                this.data[x][y] = 0;
                this.moveBlock(block, cc.Vec2(pos[0], pos[1]), () => {
                    block.destroy();
                });
                hasMoved = true;
                callback && callback();
                return;
            } else {
                callback && callback();
                return;
            }
        };

        let cnt = 0;
        for (let i = 0; i < toMove.length; i++) {
            move(toMove[i][0], toMove[i][1], () => {
                cnt++;
                if (cnt == toMove.length) {
                    this.afterMove(hasMoved);
                }
            })
        }
    },
});