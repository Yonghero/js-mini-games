import {SquareGroup} from "./SquareGroup";
import {Game} from "./Game";

/**
 * 坐标接口
 */
export interface IPonit {
    x: number,
    y: number
}

/**
 * 视图接口
 */

export interface IViewer {
    show(): void
    remove(): void
}

/**
 * 方块组合类型
 */

export type Shape = IPonit[]

/**
 * 俄罗斯方块的移动方向
 */
export enum SquareDirection{
    down,
    left,
    right
}

/**
 * 当前游戏运行的状态
 */
export enum GameStatus {
    init,
    playing,
    over,
    pause
}

export interface GameViewer{
    showNext(tetris:SquareGroup):void,
    switch(tetris:SquareGroup):void,
    /**
     * 完成界面的初始化
     */
    init(game: Game): void;

    showScore(score: number): void;

    onGamePause(): void;

    onGameStart(): void;

    onGameOver(): void;
}
