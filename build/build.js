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
var ts = require("typescript");
var uglifyJS = require("uglify-js");
var compiler = require("./vueTemplateCompiler");
var Build = (function () {
    function Build() {
    }
    Build.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tsconfig, file, component, window, txt, template, script, jsFile, templateJS, toplevel_ast, writeResult;
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
                        jsFile = ts.transpile(script, JSON.parse(tsconfig)).replace(/\"use strict\";/g, "");
                        templateJS = compiler.compile(template, {}).render;
                        jsFile += "\n        default_1.prototype.render=function(){\n            page_1.Builder.varCounter=0;\n            var _c=page_1.Builder.create;\n            var _e=page_1.Builder.empty;\n            var _l=page_1.Builder.loop;\n            var _v=page_1.Builder.space;\n            " + templateJS + "\n        }";
                        toplevel_ast = uglifyJS.parse(jsFile, { strict: false });
                        jsFile = toplevel_ast.print_to_string({ beautify: true });
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
    Build.buildUIFromTemplate = function (element, parentVariable) {
        var code = '';
        var isConsole = element.name === 'Console';
        var isEmpty = isConsole || element.name === 'Empty';
        var variable = !isEmpty ? this.variableName(element.name) : parentVariable;
        var closeBottom = 0;
        if (element.attributes["v-for"]) {
            code += "for(let " + element.attributes["v-for"] + "){" + this.newLine;
            closeBottom++;
        }
        if (element.attributes["v-if"]) {
            code += "if(" + element.attributes["v-if"] + "){" + this.newLine;
            closeBottom++;
        }
        if (isConsole) {
            code += "console.log(" + element.attributes[":log"] + ")";
        }
        if (!isEmpty) {
            //todo support more than just tabris elements
            code += "var " + variable + " = new tabris." + element.name + "(" + this.getOptions(element.attributes) + ");" + this.newLine;
        }
        if (element.elements) {
            for (var _i = 0, _a = element.elements; _i < _a.length; _i++) {
                var childElement = _a[_i];
                var result = this.buildUIFromTemplate(childElement, variable);
                code += result.code + this.newLine;
            }
        }
        if (!isEmpty && parentVariable)
            code += parentVariable + ".append(" + variable + ");" + this.newLine;
        for (var i = 0; i < closeBottom; i++) {
            code += "}" + this.newLine;
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
                curResult[locKey] = options[key];
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
        return this.stringify(result);
    };
    Build.stringify = function (obj) {
        var _this = this;
        var sobj = '{';
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var val = obj[key];
                if (key.indexOf(":") === 0) {
                    key = key.replace(':', '');
                    sobj += key + ":" + val + "," + this.newLine;
                }
                else if (Array.isArray(val)) {
                    sobj += key + ":[" + val.map(function (e) { return _this.stringify(e); }).join(',') + "]," + this.newLine;
                }
                else if (typeof (val) === 'object') {
                    sobj += key + ":" + this.stringify(val) + "," + this.newLine;
                }
                else if (typeof (val) === 'string') {
                    sobj += key + ":\"" + val + "\"," + this.newLine;
                }
                else {
                    sobj += key + ":" + val + "," + this.newLine;
                }
            }
        }
        sobj += "}";
        return sobj;
    };
    return Build;
}());
Build.varCounter = 0;
Build.newLine = '\r\n';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1QkFBeUI7QUFDekIsNkJBQStCO0FBQy9CLCtCQUFpQztBQUNqQyxvQ0FBc0M7QUFDdEMsZ0RBQW1EO0FBR25EO0lBQUE7SUF3TEEsQ0FBQztJQXRMZ0IsVUFBSSxHQUFqQjs7MEJBR1EsSUFBSSxxQkFNSixHQUFHLEVBQ0gsUUFBUSxFQUdSLE1BQU0sRUFFTixNQUFNLEVBTU4sVUFBVSxFQWNWLFlBQVk7Ozs0QkFsQ0EscUJBQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsMEJBQTBCLENBQUMsRUFBQTs7bUNBQXZELENBQUMsU0FBc0QsQ0FBQyxDQUFDLFFBQVEsRUFBRTsrQkFFdkUsaUJBQWlCO3dCQUVYLHFCQUFNLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBQTs7b0NBQWpELENBQUMsU0FBZ0QsQ0FBQyxDQUFDLFFBQVEsRUFBRTt3QkFFaEUscUJBQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBUSxTQUFTLFdBQVEsRUFBRSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsRUFBQTs7aUNBQXpGLFNBQXlGOzhCQUU1RixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLG9DQUFxQyxDQUFDLENBQUM7bUNBQzdELEdBQUcsQ0FBQyxDQUFDLENBQUM7aUNBR1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7aUNBRXpCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO3FDQU12RSxRQUFRLENBQUMsT0FBTyxD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