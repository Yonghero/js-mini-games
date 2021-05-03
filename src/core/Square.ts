import { IPonit, IViewer } from './types'
export class Square {

    private _viewer?: IViewer

    constructor(private _point: IPonit, private _color: string) {

    }

    public set viewer(v: IViewer) {
        this._viewer = v
        if (v) {
            this.viewer.show()
        }
    }

    public get viewer() {
        return this._viewer as IViewer
    }

    public get color() {
        return this._color
    }

    public get point() {
        return this._point
    }

    public set point(v) {
        this._point = v
        if (this._viewer) {
            this._viewer.show()
        }
    }

    remove(){
        this._viewer?.remove()
    }

}
