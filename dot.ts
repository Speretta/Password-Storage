
export class SyncDot{
	private static sync_dot: CanvasRenderingContext2D;
	public constructor(private _color: string){
		SyncDot.sync_dot = (document.getElementById("syncDot") as HTMLCanvasElement).getContext("2d");
		this.color = _color;
	}
	public get color(): string {
        return this._color;
    }
    public set color(color: string) {
        this._color = color;
        SyncDot.sync_dot.beginPath();
	    SyncDot.sync_dot.arc(8, 8, 4, 0, 2 * 3.14159);
	    SyncDot.sync_dot.fillStyle = color;
	    SyncDot.sync_dot.fill();
	    SyncDot.sync_dot.stroke(); 
    }

}