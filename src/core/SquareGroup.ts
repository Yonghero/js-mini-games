import { Square } from "./Square"
import { IPonit, Shape } from "./types"

export class SquareGroup {
    private readonly _square: Square[] // 真实存放方块的容器


    constructor(
        private centerPoint: IPonit,
        private _shape: Shape, // 存放俄罗斯方块的形状坐标
        private color: string
    ) {

        let arr: Square[] = []
        this._shape.forEach(shape => {
            const square = new Square({ x: centerPoint.x + shape.x, y: centerPoint.y + shape.y }, this.color)
            arr.push(square)
        })
        this._square = arr

    }

    get shape() {
        return this._shape
    }

    get squareGroup() {
        return this._square
    }

    get centerP() {
        return this.centerPoint
    }

    set centerP(point: IPonit) {
        this.centerPoint = point
        // 中心改变时根据形状数组重新设置每一个square的点位
        this.setShapePosition()
    }

    /**
     * 通知小方块更改位置
     */
    setShapePosition() {
        this.shape.forEach((shape, i) => {
            this._square[i].point = {
                x: this.centerPoint.x + shape.x,
                y: this.centerPoint.y + shape.y
            }
        })
    }
    /**
     * 旋转方向 默认顺时针
     */
    protected isClock = true

    /**
     * 旋转过后的形状
     */
    afterRotateShape(): Shape {

        if (this.isClock) {
            return this._shape.map(shape => {
                let newP: IPonit
                newP = {
                    x: -shape.y,
                    y: shape.x
                }
                return newP
            })
        } else {
            return this._shape.map(shape => {
                let newP: IPonit
                newP = {
                    x: shape.y,
                    y: -shape.x
                }
                return newP

            })
        }
    }

    /**
     * 旋转形状
     */
    rotate() {
        const newShape = this.afterRotateShape()
        this._shape = newShape
        this.setShapePosition()
    }


}
