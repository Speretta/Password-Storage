import { SyncDot } from "./dot.js";
import { DataSystem } from "./data.js";
var AuthSystem = /** @class */ (function () {
    function AuthSystem(_client_id, _redirect_uri) {
        this._client_id = _client_id;
        this._redirect_uri = _redirect_uri;
        this._dbxAuth = new Dropbox.DropboxAuth({ clientId: this._client_id });
        this._dbx = new Dropbox.Dropbox({ auth: this._dbxAuth });
        this._data_system = new DataSystem(this._dbx, this._sync_dot);
        this._sync_dot = new SyncDot("red");
    }
    AuthSystem.prototype.getAuthUrl = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (AuthSystem.getCode()) {
                _this._dbxAuth.getAuthenticationUrl(_this._redirect_uri, undefined, 'code', 'offline', undefined, undefined, true)
                    .then(function (authUrl) {
                    window.sessionStorage.setItem("codeVerifier", "");
                    window.sessionStorage.setItem("codeVerifier", _this._dbxAuth.codeVerifier);
                    window.location.href = authUrl;
                    console.log(authUrl);
                    _this._sync_dot.color = "yellow";
                    resolve(true);
                })
                    .catch(function (error) {
                    console.log(error);
                    _this._sync_dot.color = "red";
                    resolve(false);
                });
            }
            else {
                resolve(false);
            }
        });
    };
    AuthSystem.prototype.connectAuth = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var code = AuthSystem.getCode();
            _this._dbxAuth.setCodeVerifier(window.sessionStorage.getItem('codeVerifier'));
            _this._dbxAuth.getAccessTokenFromCode(_this._redirect_uri, code)
                .then(function (response) {
                _this._dbxAuth.setAccessToken(response.result.access_token);
                _this._dbx = new Dropbox.Dropbox({ auth: _this._dbxAuth });
                _this._data_system = new DataSystem(_this._dbx, _this._sync_dot);
                _this._data_system.startSync();
                window.sessionStorage.setItem("codeAuth", code);
                _this._sync_dot.color = "yellow";
                resolve(true);
            }).catch(function (error) { _this._sync_dot.color = "red"; console.log(error); resolve(false); });
        });
    };
    Object.defineProperty(AuthSystem.prototype, "DataSystem", {
        get: function () {
            return this._data_system;
        },
        enumerable: false,
        configurable: true
    });
    AuthSystem.getCode = function () {
        var params = new URLSearchParams(window.location.search);
        var code = params.get("code");
        if (code) {
            return code;
        }
        return "false";
    };
    Object.defineProperty(AuthSystem.prototype, "dataSystem", {
        get: function () {
            return this._data_system;
        },
        enumerable: false,
        configurable: true
    });
    return AuthSystem;
}());
export { AuthSystem };
