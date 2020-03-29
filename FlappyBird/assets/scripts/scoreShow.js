cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        bestLabel: cc.Label,
    },

    start() {
        let score = cc.sys.localStorage.getItem('score');
        if (score === null || score == 0) score = 0;
        this.scoreLabel.string = "分数 : " + score;
        let best = cc.sys.localStorage.getItem('best');
        if (best === null || best == 0 || parseInt(best) < parseInt(score)) best = score;
        this.bestLabel.string = "最高分 : " + best;
        cc.sys.localStorage.setItem('best', best);
    },
});