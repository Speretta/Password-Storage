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
import { Website } from "./data.js";
var WebsiteMenu = /** @class */ (function () {
    function WebsiteMenu(_url, _li, _div, _logo, _label) {
        this._url = _url;
        this._li = _li;
        this._div = _div;
        this._logo = _logo;
        this._label = _label;
    }
    WebsiteMenu.prototype.getText = function () {
        return this._label.innerHTML;
    };
    WebsiteMenu.prototype.setText = function (text) {
        this._label.innerHTML = text;
    };
    WebsiteMenu.prototype.setUrl = function (text) {
        checkImgAndSet(text, this._logo);
    };
    Object.defineProperty(WebsiteMenu.prototype, "url", {
        get: function () {
            return this._url;
        },
        set: function (text) {
            this._url = text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebsiteMenu.prototype, "li", {
        get: function () {
            return this._li;
        },
        enumerable: false,
        configurable: true
    });
    WebsiteMenu.prototype.clearMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this._logo.remove();
                        _this._label.remove();
                        _this._div.remove();
                        _this._li.remove();
                        resolve();
                    })];
            });
        });
    };
    return WebsiteMenu;
}());
var WebList = /** @class */ (function () {
    function WebList() {
        this._list = [];
        this._pass_pop_up = document.getElementById("passPopUp");
        this._pass_button = document.getElementById("popupButton");
        this._pass_save_button = document.getElementById("passSaveButton");
        var self = this;
        this._pass_button.onclick = function () { self._pass_pop_up.style.display = "none"; self._pass_save_button.removeAttribute('siteid'); };
        this._pass_name = document.getElementById("passName");
        this._pass_url = document.getElementById("passUrl");
        this._pass_account = document.getElementById("passAccount");
        this._pass_Pass = document.getElementById("passPass");
        this._pass_img = document.getElementById("passImg");
    }
    WebList.prototype.createMenuFromArray = function (websites) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, id, ws;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in websites)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        id = _a[_i];
                        ws = websites[id];
                        return [4 /*yield*/, this.createMenu(id, ws)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WebList.prototype.createMenu = function (id, website) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var li, logoDiv, logo, nameDiv, name, account, settingDiv, settingDot, settingTrashButton, settingTrashImage, menu;
                        return __generator(this, function (_a) {
                            li = document.createElement("li");
                            logoDiv = document.createElement("div");
                            logo = document.createElement("img");
                            nameDiv = document.createElement("div");
                            name = document.createElement("label");
                            account = document.createElement("label");
                            settingDiv = document.createElement("div");
                            settingDot = document.createElement("img");
                            settingTrashButton = document.createElement("button");
                            settingTrashImage = document.createElement("img");
                            logoDiv.classList.add("logoDiv");
                            logo.classList.add("logo");
                            checkImgAndSet(website.url, logo); //Maybe await
                            nameDiv.style.textOverflow = "ellipsis";
                            nameDiv.style.overflow = "hidden";
                            name.innerHTML = website.name;
                            name.classList.add("menuName");
                            account.innerHTML = website.account;
                            account.classList.add("menuAccount");
                            settingDiv.classList.add("menuSettingDiv");
                            settingDiv.classList.add("menuSetting");
                            settingDiv.id = "menuSettingDiv" + this._list.length;
                            settingDot.src = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2Fdot.png?v=1620997092665";
                            settingDot.classList.add("menuDot");
                            settingDot.classList.add("menuSetting");
                            settingDot.id = "menuDot" + this._list.length;
                            settingTrashButton.style.display = "none";
                            settingTrashButton.id = "menuSettingTrash" + this._list.length;
                            settingTrashButton.classList.add("menuSetting");
                            settingTrashButton.classList.add("menuSettingTrash");
                            settingTrashImage.src = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2Ftrash.png?v=1621001711425";
                            settingTrashImage.classList.add("menuSettingTrash");
                            settingTrashImage.classList.add("menuSetting");
                            WebList._ul.appendChild(li);
                            li.appendChild(logoDiv);
                            logoDiv.appendChild(logo);
                            nameDiv.appendChild(name);
                            nameDiv.appendChild(account);
                            settingTrashButton.appendChild(settingTrashImage);
                            settingDiv.appendChild(settingDot);
                            settingDiv.appendChild(settingTrashButton);
                            logoDiv.appendChild(settingDiv);
                            logoDiv.appendChild(nameDiv);
                            this.setIdChildElements(id, li);
                            menu = new WebsiteMenu(website.url, li, logoDiv, logo, name);
                            this._list.push(menu);
                            resolve();
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    WebList.prototype.openPopUp = function (id, website) {
        this._pass_name.value = website['name'];
        this._pass_url.value = website['url'];
        if (website['url'] == "") {
            checkImgAndSet("default.png", this._pass_img);
        }
        else {
            checkImgAndSet(website.url, this._pass_img);
        }
        this._pass_account.value = website['account'];
        this._pass_Pass.value = website['pass'];
        this._pass_save_button.setAttribute('siteid', id);
        this._pass_pop_up.style.display = "block";
    };
    WebList.prototype.getPopUpWebsite = function () {
        var website = new Website(this._pass_name.value, this._pass_url.value, this._pass_account.value, this._pass_Pass.value);
        return website;
    };
    WebList.prototype.closPopUp = function () {
        this._pass_pop_up.style.display = "none";
    };
    WebList.prototype.reloadOrCreateMenu = function (id, website) {
        return __awaiter(this, void 0, void 0, function () {
            var old_website;
            return __generator(this, function (_a) {
                old_website = this._list[id];
                if (old_website != undefined) {
                    if (website.name != old_website.getText()) {
                        this._list[id].setText(website.name);
                    }
                    if (website.url != old_website.url) {
                        this._list[id].setUrl(website.url);
                    }
                }
                else {
                    this.createMenu(id, website);
                }
                return [2 /*return*/];
            });
        });
    };
    WebList.prototype.setIdChildElements = function (id, element) {
        var child_elements = element.querySelectorAll("*");
        for (var id2 in child_elements) {
            if (typeof child_elements[id2] == "object") {
                child_elements[id2].setAttribute("siteid", id);
                if (child_elements[id2].id.includes("menuDot"))
                    child_elements[id2].id = "menuDot" + id;
                else if (child_elements[id2].id.includes("menuSettingTrash"))
                    child_elements[id2].id = "menuSettingTrash" + id;
                else if (child_elements[id2].id.includes("menuSettingDiv"))
                    child_elements[id2].id = "menuSettingDiv" + id;
            }
        }
    };
    WebList.prototype.deleteMenu = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var k;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._list[id]) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._list[id].clearMe()];
                    case 1:
                        _a.sent();
                        this._list.splice(id, 1);
                        for (k = id; k < this._list.length; k++) {
                            this.setIdChildElements(k, this._list[k].li);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    WebList._ul = document.getElementById("webList");
    return WebList;
}());
export { WebList };
/*
I need help here. Gets error when assigning image resource. An ugly sight.
*/
export function checkImgAndSet(logo_link, logo) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var req = new XMLHttpRequest();
                    var url = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2F" + logo_link + ".webp";
                    if (logo_link == "default.png") {
                        var url = "https://cdn.glitch.com/5d8ab5d3-5560-4969-892d-489301146ce2%2F" + logo_link;
                    }
                    req.open('GET', url, true);
                    req.onload = function () {
                        if (req.status == 200) {
                            logo.src = url;
                        }
                        else {
                            logo.src = "//besticon-demo.herokuapp.com/icon?url=" + logo_link + "&size=80..120..200";
                        }
                        resolve();
                    };
                    req.onerror = function () {
                        resolve();
                    };
                    req.send();
                })];
        });
    });
}
