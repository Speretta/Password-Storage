var SyncDot = /** @class */ (function () {
    function SyncDot(_color) {
        this._color = _color;
        SyncDot.sync_dot = document.getElementById("syncDot").getContext("2d");
        this.color = _color;
    }
    Object.defineProperty(SyncDot.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
            SyncDot.sync_dot.beginPath();
            SyncDot.sync_dot.arc(8, 8, 4, 0, 2 * 3.14159);
            SyncDot.sync_dot.fillStyle = color;
            SyncDot.sync_dot.fill();
            SyncDot.sync_dot.stroke();
        },
        enumerable: false,
        configurable: true
    });
    return SyncDot;
}());
export { SyncDot };
