cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {

    },

    mode(event,number){
        cc.sys.localStorage.setItem('gameMode',number);
        cc.director.loadScene('gameStart');
    }
});
