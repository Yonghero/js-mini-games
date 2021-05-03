/**
 * 游戏的规则判定方法
 */
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { IPonit, Shape, SquareDirection } from "./types";
import {Square} from "./Square";

import panelConfig from './GameConfig'


function isPoint(obj: any): obj is IPonit {
    return typeof obj.x !== 'undefined';

}


export class TerisRules {

    /**
     * 俄罗斯方块下一步是否能移动
     * @param shape 俄x
     * @param centerPoint 下一步要移动的中心点
     * @param exists
     */
    static canIMove(shape: Shape, centerPoint: IPonit,exists:Square[]): boolean {
        const movedShape = shape.map(point => ({ x: point.x + centerPoint.x, y: point.y + centerPoint.y })) // 移动完成的俄罗斯方块
        if (movedShape.some(point => point.x < 0 || point.x > GameConfig.panelSize.width - 1 || point.y < 0 || point.y > GameConfig.panelSize.height - 1)) {
            return false
        }
        // 判断小方块是否重叠
        return !movedShape.some(shape => exists.some(existShape => shape.x === existShape.point.x && shape.y === existShape.point.y));

    }

    /**
     * 函数重载
     * @param group
     * @param centerPointOrDirection
     * @param exists
     */
    static move(group: SquareGroup, centerPointOrDirection: IPonit,exists:Square[]): boolean
    static move(group: SquareGroup, centerPointOrDirection: SquareDirection,exists:Square[]): boolean

    static move(group: SquareGroup, centerPointOrDirection: IPonit | SquareDirection,exists:Square[]): boolean {

        if (isPoint(centerPointOrDirection)) {
            if (this.canIMove(group.shape, centerPointOrDirection,exists)) {
                group.centerP = centerPointOrDirection
                return true
            }
            return false
        }
        else {
            const direction = centerPointOrDirection
            let nextPoint: IPonit = { x: 0, y: 0 };
            if (direction === SquareDirection.down) {
                nextPoint = {
                    x: group.centerP.x,
                    y: group.centerP.y + 1
                }
            } else if (direction === SquareDirection.right) {
                nextPoint = {
                    x: group.centerP.x + 1,
                    y: group.centerP.y
                }
            } else if (direction === SquareDirection.left) {
                nextPoint = {
                    x: group.centerP.x - 1,
                    y: group.centerP.y
                }
            }
            return this.move(group, nextPoint,exists)
        }

    }


    /**
     * 立即下落
     * @param group
     * @param direction
     */
    static moveImmediately(group:SquareGroup,direction:SquareDirection,exists:Square[]){
        while (this.move(group,direction,exists)){}
    }

    /**
     *  俄罗斯方块是否能按规则旋转
     * @param group
     * @param exists
     */
    static rotate(group: SquareGroup,exists:Square[]): boolean {
           const newShape =  group.afterRotateShape()
           if(this.canIMove(newShape,group.centerP,exists)){
               group.rotate()
               return true
           }
           return false
    }

    static isDeleteLine(exists:Square[]):number{
        const y = exists.map(square => square.point.y)
        // 获取当前已存在小方块的y坐标的最小值和最大值
        const minY = Math.min(...y)
        const maxY = Math.max(...y)
        let num = 0
        for (let y = minY; y <= maxY; y++){
            // 提取y轴上已经存在的小方块
           const existsY = exists.filter(square => square.point.y === y)
           if (this.isMeetCondition(existsY,y)) {
               this.deleteLine(exists,existsY,y) // 删除该行
               num++ // 累计消除的行数
           }
        }
        return num
    }

    /**
     *  是否满足删除小方块的条件
     * @param exists
     * @param y
     * @private
     */
    private static isMeetCondition(exists: Square[],y:number):boolean{
        // 如果y轴上存在的小方块的数量等于面板的宽度那说明可以消除
        return exists.length === panelConfig.panelSize.width

    }

    /**
     * 删除当前行的小方块
     * @param exists
     * @param existsY
     * @param y
     * @private
     */

    private static deleteLine(exists:Square[],existsY:Square[],y:number){
        existsY.forEach(square => {
            // 界面上移除该行的小方块
            square.viewer.remove()
            // 保存小方块的数组中也进行移除
            const index = exists.indexOf(square)
            exists.splice(index,1)
        })
        // 剩下的小方块往下移一格
        exists.forEach(square => {
            if(square.point.y < y){
                square.point = {
                    x: square.point.x,
                    y: square.point.y + 1
                }

            }
        })
    }
}
