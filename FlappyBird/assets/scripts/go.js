cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {
        this.node.on('touchstart', () => {
            cc.director.loadScene('game');
        });
    },
});