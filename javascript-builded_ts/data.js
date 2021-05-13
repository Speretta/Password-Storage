var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { WebList } from "./weblist.js";
var Website = /** @class */ (function () {
    function Website(_name, _url, _account, _pass) {
        this._name = _name;
        this._url = _url;
        this._account = _account;
        this._pass = _pass;
    }
    ;
    Website.prototype.toJSON = function () {
        return {
            name: this._name,
            url: this._url,
            account: this._account,
            pass: this._pass,
        };
    };
    Object.defineProperty(Website.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Website.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Website.prototype, "account", {
        get: function () {
            return this._account;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Website.prototype, "pass", {
        get: function () {
            return this._pass;
        },
        enumerable: false,
        configurable: true
    });
    return Website;
}());
export { Website };
var DataSystem = /** @class */ (function () {
    function DataSystem(_dbx, _sync_dot) {
        this._dbx = _dbx;
        this._sync_dot = _sync_dot;
        this._weblist = new WebList();
        this._websites = [];
    }
    DataSystem.prototype.getWebsitesJSONString = function () {
        return JSON.stringify(this._websites);
    };
    DataSystem.prototype.isAvailablePassFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dot;
            var _this = this;
            return __generator(this, function (_a) {
                dot = this._sync_dot;
                return [2 /*return*/, new Promise(function (resolve) {
                        _this._dbx.filesListFolder({ path: "" })
                            .then(function (response) {
                            if (response.result.entries[0]) {
                                dot.color = "yellow";
                                resolve(true);
                            }
                            resolve(false);
                        }).catch(function (error) {
                            dot.color = "red";
                            resolve(false);
                        });
                    })];
            });
        });
    };
    DataSystem.prototype.getPassAndSet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dot, websites;
            var _this = this;
            return __generator(this, function (_a) {
                dot = this._sync_dot;
                websites = this._websites;
                return [2 /*return*/, new Promise(function (resolve) {
                        _this._dbx.filesDownload({ path: "/" + "passwords.json" })
                            .then(function (response) {
                            var json = JSON.parse("{}");
                            var reader = new FileReader();
                            reader.readAsText(response.result.fileBlob);
                            reader.onload = function (e) {
                                json = JSON.parse(reader.result);
                                console.log(json);
                                for (var id in json) {
                                    var website = new Website(json[id].name, json[id].url, json[id].account, json[id].pass);
                                    websites.push(website);
                                }
                                dot.color = "yellow";
                                resolve(true);
                            };
                        }).catch(function (error) {
                            dot.color = "red";
                            resolve(false);
                        });
                    })];
            });
        });
    };
    DataSystem.prototype.deletePassInDbx = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this._dbx.filesDelete({ path: "/" + "passwords.json" });
                        resolve();
                    })];
            });
        });
    };
    DataSystem.prototype.startSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, this.isAvailablePassFile().then(function (value) {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(value == true)) return [3 /*break*/, 2];
                                                return [4 /*yield*/, self.getPassAndSet().then(function (value) {
                                                        if (value == true) {
                                                            self._weblist.createMenuFromArray(self._websites);
                                                        }
                                                    })];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                    case 1:
                        _a.sent();
                        this._sync_dot.color = "greenyellow";
                        if (this._sync_dot.color != "red") {
                            this._sync_dot.color = "green";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DataSystem.prototype.updateCloudFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dot;
            var _this = this;
            return __generator(this, function (_a) {
                dot = this._sync_dot;
                dot.color = "yellow";
                return [2 /*return*/, new Promise(function (resolve) {
                        var file = new File([_this.getWebsitesJSONString()], "passwords.json", { type: "application/json" });
                        _this._dbx.filesUpload({ path: "/" + "passwords.json", contents: file, mode: 'overwrite' })
                            .then(function response() {
                            dot.color = "green";
                            resolve(true);
                        }).catch(function error() { dot.color = "red"; resolve(false); });
                    })];
            });
        });
    };
    Object.defineProperty(DataSystem.prototype, "websites", {
        get: function () {
            return this._websites;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataSystem.prototype, "weblist", {
        get: function () {
            return this._weblist;
        },
        enumerable: false,
        configurable: true
    });
    DataSystem.prototype.setWebsiteData = function (id, website) {
        this._websites[id] = website;
        this._weblist.reloadMenu(id, website);
    };
    return DataSystem;
}());
export { DataSystem };
