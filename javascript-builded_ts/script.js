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
var CLIENT_ID = "null";
var REDIRECT_URI = "http://localhost:8080";
import { AuthSystem } from "./auth.js";
import { Website } from "./data.js";
var auth = new AuthSystem(CLIENT_ID, REDIRECT_URI);
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!AuthSystem.getCode()) return [3 /*break*/, 2];
                return [4 /*yield*/, auth.connectAuth()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
start();
document.addEventListener("click", click);
function click(event) {
    var id = event.target.getAttribute("siteid");
    if (event.target.hasAttribute("siteid") && event.target.id != "passSaveButton") {
        var site = auth.dataSystem.websites[id];
        if (site)
            auth.dataSystem.weblist.openPopUp(id, site);
    }
    else if (event.target.id == "passSaveButton") {
        var website = auth.dataSystem.weblist.getPopUpWebsite();
        auth.dataSystem.setWebsiteData(id, website);
        auth.dataSystem.weblist.closPopUp();
    }
    else if (event.target.classList.contains("addButton")) {
        var new_site_id = auth.dataSystem.websites.length;
        var new_site = new Website("New Website", "", "", "");
        auth.dataSystem.weblist.openPopUp(new_site_id, new_site);
    }
    else if (event.target.id == "syncDot") {
        if (confirm("Verilerinizi buluta yüklemek üzeresiniz, devam etmek için onaylayın.")) {
            try {
                auth.dataSystem.updateCloudFile();
            }
            catch (error) {
                alert("Dropbox bulutuna bağlanılamadı: " + error);
            }
        }
    }
}
var ul = document.getElementById("webList"); //Weblist elemanı burada tanımlanıyor 
document.getElementById("searchInput").addEventListener('input', searchFilter);
function searchFilter(e) {
    return __awaiter(this, void 0, void 0, function () {
        var li, id, element, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(e.target.value == "başlat")) return [3 /*break*/, 2];
                    return [4 /*yield*/, auth.getAuthUrl()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    li = ul.getElementsByTagName('li');
                    if (li.length > 0)
                        for (id = 0; id < li.length; id++) {
                            element = li[id];
                            text = (auth.dataSystem.websites[id].url + auth.dataSystem.websites[id].name).toUpperCase();
                            if (text.includes(e.target.value.toUpperCase())) {
                                element.style.display = "";
                            }
                            else {
                                element.style.display = "none";
                            }
                        }
                    return [2 /*return*/];
            }
        });
    });
}
