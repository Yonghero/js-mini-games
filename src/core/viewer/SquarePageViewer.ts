import { IViewer } from "../types";
import { Square } from "../Square";
import PageConfig from './PageConfig'
import $ from 'jquery'

export class SquarePageViewer implements IViewer {

    private dom?: JQuery<HTMLElement>
    private isRemove: Boolean = false // 默认没有被移除

    constructor(
        private square: Square,
        private container: JQuery<HTMLElement>
    ) {

    }

    show(): void {
        if (this.isRemove) return

        if (!this.dom) {
            this.dom = $('<div>').css({
                position: 'absolute',
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: '1px solid #ccc'
            }).appendTo(this.container)

        }

        this.dom.css({
            left: this.square.point.x * PageConfig.SquareSize.width,
            top: this.square.point.y * PageConfig.SquareSize.height,
            background: this.square.color
        })

    }
    remove(): void {
        if (this.dom) {
            this.dom.remove()
            this.isRemove = true
        }
    }

}