import {SquareGroup} from "./SquareGroup";
import {IPonit} from "./types";
import {getRandom} from "./utils";


export class TShape extends SquareGroup {
    constructor(
        centerPoint: IPonit,
        color: string
    ) {
        super(centerPoint, [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], color)
    }
}

// export const TShape: Shape = [
//     { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }
// ]

export class LShape extends SquareGroup {
    constructor(
        centerPoint: IPonit,
        color: string
    ) {
        super(centerPoint, [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], color)
    }
    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}

// export const LShape: Shape = [
//     { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
// ]

export class LMirrorShape extends SquareGroup {
    constructor(
        centerPoint: IPonit,
        color: string
    ) {
        super(centerPoint, [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], color)
    }

    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }

}

// export const LMirrorShape: Shape = [
//     { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }
// ]

export class SShape extends SquareGroup {
    constructor(
        centerPoint: IPonit,
        color: string
    ) {
        super(centerPoint, [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], color)
    }

    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}


// export const SShape: Shape = [
//     { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }
// ]


export class SMirrorShape extends SquareGroup {
    constructor(
        centerPoint: IPonit,
        color: string
    ) {
        super(centerPoint, [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], color)
    }

    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}


// export const SMirrorShape: Shape = [
//     { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
// ]


export class SquareShape extends SquareGroup {
    constructor(
        centerPoint: IPonit,
        color: string
    ) {
        super(centerPoint, [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], color)
    }

    afterRotateShape() {
        return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
    }


}
// export const SquareShape: Shape = [
//     { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }
// ]

export class LineShape extends SquareGroup {
    constructor(
        centerPoint: IPonit,
        color: string
    ) {
        super(centerPoint, [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], color)
    }

    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
}
// export const LineShape: Shape = [
//     { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
// ]


// 全部形状组合
const allShape = [
    TShape,
    LShape,
    LineShape,
    SquareShape,
    SMirrorShape,
    SShape,
    LShape

]

const colors = [
    'red',
    'yellow',
    'green',
    'gray',
    'white'
]

/**
 *  生成一个俄罗斯方块 颜色随机 样式随机
 *  @param centerPoint 俄罗斯方块放置的中心点位
 */
export default function createShape(centerPoint: IPonit) {

    const shape = allShape[getRandom(allShape.length, 0)]
    const color = colors[getRandom(colors.length, 0)]
    return new shape(centerPoint, color)

}
