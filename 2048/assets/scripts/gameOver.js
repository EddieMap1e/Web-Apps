cc.Class({
    extends: cc.Component,

    properties: {
        bestScore: cc.Label,
        failScore: cc.Label
    },
    start() {
        this.init();
    },

    init() {
        let failScore = cc.sys.localStorage.getItem('failScore');
        if (failScore === 'null') failScore = 0;
        cc.log(failScore);
        this.failScore.string = "分数 : " + failScore;
        let bestScore = cc.sys.localStorage.getItem('bestScore');
        if (bestScore === 'null' || parseInt(failScore) > parseInt(bestScore)) bestScore = failScore;
        cc.sys.localStorage.setItem('bestScore', bestScore);
        this.bestScore.string = "最高分 : " + bestScore;
        cc.log(bestScore);
    },

    retry(event,customEventData){
        cc.director.loadScene('gameStart');
    }
});