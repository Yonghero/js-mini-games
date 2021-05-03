import {GameStatus, GameViewer, SquareDirection} from "./types";
import {SquareGroup} from "./SquareGroup";
import createShape from "./Teris";
import GameConfig from "./GameConfig";
import {TerisRules} from "./TerisRules";
import {Square} from "./Square";

export class Game {

    public gameStatus:GameStatus = GameStatus.init // 游戏状态
    private _nextTetris:SquareGroup = createShape({x:0,y:0}) // 下一个小方块
    private _curTetris?: SquareGroup // 当前的小方块
    private timer?:number
    private score:number = 0
    public duration:number = 1000
    private exists:Square[] = []  // 保存已经存在的



    constructor( private gameViewer:GameViewer) {
        this.duration = GameConfig.levels[0].duration;
        this.createNext()
        this.gameViewer.init(this);
        this.gameViewer.showScore(this.score);
    }

    createNext(){
        this._nextTetris = createShape({x:0,y:0})
        this.resetTetrisCenterPoint(this._nextTetris,GameConfig.nextSize.width)
        this.gameViewer.showNext(this._nextTetris) // 初始化显示next面板在中的小方块
    }

    /**
     * 根据俄罗斯方块形状 更改展示的中心点位坐标 使方块的位置始终在居中靠上的位置
     * @param tetris 方块形状
     * @param width 展示容器宽度
     */
    resetTetrisCenterPoint(tetris: SquareGroup,width:number){
        const x = Math.ceil(width / 2) - 1 // 面板居中位置
        const y = 0
        tetris.centerP = {x,y} // 设置中心点时 组合成的每一个方块会根据中心点的变化而变化
        // 变化后再计算y坐标有无越界
        while (tetris.squareGroup.some(square => square.point.y < 0)){
            tetris.centerP = {
                x: tetris.centerP.x,
                y: tetris.centerP.y + 1
            }
        }
    }


    start(){


        //游戏状态的改变
        if (this.gameStatus === GameStatus.playing) {
            return;
        }
        //从游戏结束到开始
        if (this.gameStatus === GameStatus.over) {
            //初始化操作
            this.init();
        }
        this.gameStatus = GameStatus.playing;
        if (!this._curTetris) {
            //给当前玩家操作的方块赋值
            this.switchTetris();
        }
        this.autoMove();
        this.gameViewer.onGameStart();


        // if(this.gameStatus === GameStatus.playing){
        //     return
        // }
        // if(this.gameStatus === GameStatus.init){
        //     this.gameStatus = GameStatus.playing // 更改游戏为开始状态
        //     this.switchTetris()
        //     this.autoMove() // 开始自动移动
        // }
    }

    /**
     * 重新开始游戏
     */
    init(){
        this.gameStatus = GameStatus.init
        clearInterval(this.timer)
        this.timer = undefined
        // 清除已经hitBottom的小方块
        this.exists.forEach(square => {
            square.viewer.remove()
        })
        this.exists = []
        // 清除当前小方块
        this._curTetris?.squareGroup.forEach(square => square.viewer.remove())
        this._curTetris = undefined
        this.start()
    }

    /**
     * 游戏暂停
     */

    pause(){
        this.gameStatus = GameStatus.pause
        clearInterval(this.timer)
        this.timer = undefined
        console.log(this.timer)
        this.gameViewer.onGamePause();
    }

    /**
     * 切换方块
     */
    switchTetris(){
        this._curTetris = this._nextTetris // 下一个小方块给到当前小方块
        // 判断游戏是否结束
        if (!TerisRules.canIMove(this._curTetris.shape, this._curTetris.centerP, this.exists)){
            this.gameStatus = GameStatus.over
            clearInterval(this.timer)
            this.timer = undefined
            this.gameViewer.onGameOver();
            return
        }
        this.createNext() // 重新创建下一个小方块
        this.gameViewer.switch(this._curTetris) // 下一个方块和当前方块切换操作 相对应的页面也发生改变
    }
    /**
     * 自动移动 根据分数动态变速
     */
    autoMove(){
        if(this.timer && this.gameStatus !== GameStatus.playing){
            return
        }
        this.timer = setInterval(()=>{
            if(this._curTetris){
                const isArriveBottom = TerisRules.move(this._curTetris,SquareDirection.down,this.exists)
                // 触底之后 继续生产小方块
                if(!isArriveBottom){
                    this.hitBottom()
                }
            }
        },this.duration)
    }


    hitBottom(){
        if(this._curTetris){
            this.exists.push(...this._curTetris.squareGroup)
        }
        // 消除满足规则的方块
        const num = TerisRules.isDeleteLine(this.exists)
        this.addScore(num);
        this.switchTetris()
    }
    controlLeft() {
        if (this._curTetris && this.gameStatus === GameStatus.playing) {
            TerisRules.move(this._curTetris,SquareDirection.left,this.exists);
        }
    }

    controlRight() {
        if (this._curTetris && this.gameStatus === GameStatus.playing) {
            TerisRules.move(this._curTetris,SquareDirection.right,this.exists);
        }
    }

    controlDown() {
        if (this._curTetris && this.gameStatus === GameStatus.playing) {
            TerisRules.moveImmediately(this._curTetris,SquareDirection.down,this.exists)
        }
    }

    controlRotate() {
        if (this._curTetris && this.gameStatus === GameStatus.playing) {
           TerisRules.rotate(this._curTetris,this.exists)
        }
    }

    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return;
        }
        else if (lineNum === 1) {
            this.score += 10;
        }
        else if (lineNum === 2) {
            this.score += 25;
        }
        else if (lineNum === 3) {
            this.score += 50;
        }
        else {
            this.score += 100;
        }
    }
}
