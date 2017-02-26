"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var jsdom = require("jsdom");
var convert = require("xml-js");
var ts = require("typescript");
var Build = (function () {
    function Build() {
    }
    Build.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tsconfig, file, component, window, txt, template, script, templateJson, templateJS, jsFile, writeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, awaiter(fs.readFile, "../scripts/tsconfig.json")];
                    case 1:
                        tsconfig = (_a.sent()).toString();
                        file = "LoadingPage.vue";
                        return [4 /*yield*/, awaiter(fs.readFile, "../scripts/" + file)];
                    case 2:
                        component = (_a.sent()).toString();
                        return [4 /*yield*/, awaiter(jsdom.env, "<vue>" + component + "</vue>", ["http://code.jquery.com/jquery.js"])];
                    case 3:
                        window = _a.sent();
                        txt = component.match(new RegExp("<template>((.|[\r\n])*)</template>"));
                        template = txt[1];
                        script = window.$('script').html();
                        templateJson = JSON.parse(convert.xml2json(template, { compact: false, spaces: 4 }));
                        templateJS = this.buildUIFromTemplate(templateJson.elements[0]);
                        jsFile = ts.transpile(script, JSON.parse(tsconfig));
                        jsFile += "default_1.prototype.render=function(){" + templateJS.code + " return " + templateJS.variable + ";}";
                        return [4 /*yield*/, awaiter(fs.writeFile, "../www/scripts/" + file, jsFile)];
                    case 4:
                        writeResult = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Build.variableName = function (key) {
        return key + "" + (this.varCounter++);
    };
    Build.buildUIFromTemplate = function (element) {
        var code = '';
        var variable = this.variableName(element.name);
        code += "var " + variable + " = new tabris." + element.name + "(" + this.getOptions(element.attributes) + ");";
        if (element.elements) {
            for (var _i = 0, _a = element.elements; _i < _a.length; _i++) {
                var childElement = _a[_i];
                //todo support our components
                //need to determine if the key is in the list of tabris elements
                //if not try to require the component somehow
                var result = this.buildUIFromTemplate(childElement);
                code += result.code;
                code += result.variable + ".appendTo(" + variable + ");";
            }
        }
        return { variable: variable, code: code };
    };
    Build.getOptions = function (options) {
        var result = {};
        for (var key in options) {
            var curResult = result;
            var locKey = key;
            if (key.indexOf('.') >= 0) {
                var locKeys = key.replace(':', '').split('.');
                for (var l = 0; l < locKeys.length - 1; l++) {
                    locKey = locKeys[l];
                    if (!curResult[locKey]) {
                        curResult[locKey] = {};
                    }
                    curResult = curResult[locKey];
                }
                locKey = locKeys[locKeys.length - 1];
            }
            if (locKey[0] === ':') {
            }
            else if (locKey[0] === 'v' && locKey[1] === '-') {
            }
            else {
                var float = parseFloat(options[key]);
                if (!isNaN(float)) {
                    curResult[locKey] = float;
                    continue;
                }
                if (options[locKey] === "true") {
                    curResult[locKey] = true;
                    continue;
                }
                if (options[locKey] === "false") {
                    curResult[locKey] = false;
                    continue;
                }
                curResult[locKey] = options[key];
            }
        }
        return JSON.stringify(result);
    };
    return Build;
}());
Build.varCounter = 0;
exports.default = Build;
var awaiter = function (call) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        args.push(function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
        call.apply(null, args);
    });
};
Build.main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUJBQXlCO0FBQ3pCLDZCQUErQjtBQUMvQixnQ0FBa0M7QUFDbEMsK0JBQWlDO0FBR2pDO0lBQUE7SUFrR0EsQ0FBQztJQWhHZ0IsVUFBSSxHQUFqQjs7MEJBR1EsSUFBSSxxQkFNSixHQUFHLEVBQ0gsUUFBUSxFQUVSLE1BQU0sRUFFTixZQUFZLEVBQ1osVUFBVSxFQUdWLE1BQU07Ozs0QkFqQk0scUJBQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsMEJBQTBCLENBQUMsRUFBQTs7bUNBQXZELENBQUMsU0FBc0QsQ0FBQyxDQUFDLFFBQVEsRUFBRTsrQkFFdkUsaUJBQWlCO3dCQUVYLHFCQUFNLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBQTs7b0NBQWpELENBQUMsU0FBZ0QsQ0FBQyxDQUFDLFFBQVEsRUFBRTt3QkFFaEUscUJBQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBUSxTQUFTLFdBQVEsRUFBRSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsRUFBQTs7aUNBQXpGLFNBQXlGOzhCQUU1RixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLG9DQUFxQyxDQUFDLENBQUM7bUNBQzdELEdBQUcsQ0FBQyxDQUFDLENBQUM7aUNBRVIsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7dUNBRVYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7cUNBQzlFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZ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