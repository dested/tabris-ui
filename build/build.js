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
            var tsconfig, files, i, file, component, window_1, txt, template, script, jsFile, templateJS, toplevel_ast, writeResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, awaiter(fs.readFile, "../scripts/tsconfig.json")];
                    case 1:
                        tsconfig = (_a.sent()).toString();
                        return [4 /*yield*/, awaiter(fs.readdir, "../scripts/")];
                    case 2:
                        files = _a.sent();
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < files.length)) return [3 /*break*/, 8];
                        file = files[i];
                        if (!(file.indexOf(".vue") >= 0)) return [3 /*break*/, 7];
                        console.log('starting ' + file);
                        return [4 /*yield*/, awaiter(fs.readFile, "../scripts/" + file)];
                    case 4:
                        component = (_a.sent()).toString();
                        return [4 /*yield*/, awaiter(jsdom.env, "<vue>" + component + "</vue>", ["http://code.jquery.com/jquery.js"])];
                    case 5:
                        window_1 = _a.sent();
                        txt = component.match(new RegExp("<template>((.|[\r\n])*)</template>"));
                        template = txt[1];
                        script = window_1.$('script').html();
                        jsFile = ts.transpile(script, JSON.parse(tsconfig)).replace(/\"use strict\";/g, "");
                        templateJS = compiler.compile(template, {}).render;
                        jsFile += "\n                        default_1.prototype.render=function(){\n                            var _c=page_1.Builder.create;\n                            var _e=page_1.Builder.empty;\n                            var _l=page_1.Builder.loop;\n                            var _v=page_1.Builder.space;\n                            " + templateJS + "\n                        }";
                        toplevel_ast = uglifyJS.parse(jsFile, { strict: false });
                        jsFile = toplevel_ast.print_to_string({ beautify: true });
                        return [4 /*yield*/, awaiter(fs.writeFile, "../www/scripts/" + file, jsFile)];
                    case 6:
                        writeResult = _a.sent();
                        console.log('writing ' + file);
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 3];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Build;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1QkFBeUI7QUFDekIsNkJBQStCO0FBQy9CLCtCQUFpQztBQUNqQyxvQ0FBc0M7QUFDdEMsZ0RBQW1EO0FBR25EO0lBQUE7SUFpREEsQ0FBQztJQS9DZ0IsVUFBSSxHQUFqQjs7b0NBUVksSUFBSSx1QkFPQSxHQUFHLEVBQ0gsUUFBUSxFQUdSLE1BQU0sRUFFTixNQUFNLEVBR04sVUFBVSxFQVdWLFlBQVk7Ozs0QkFsQ1IscUJBQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsMEJBQTBCLENBQUMsRUFBQTs7bUNBQXZELENBQUMsU0FBc0QsQ0FBQyxDQUFDLFFBQVEsRUFBRTt3QkFHdEUscUJBQU0sT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUE7O2dDQUF4QyxTQUF3Qzs0QkFHdkMsQ0FBQzs7OzZCQUFFLENBQUEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUE7K0JBQ2pCLEtBQUssQ0FBQyxDQUFDLENBQUM7NkJBQ2YsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQSxFQUF6Qix3QkFBeUI7d0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxDQUFBO3dCQUNaLHFCQUFNLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBQTs7b0NBQWpELENBQUMsU0FBZ0QsQ0FBQyxDQUFDLFFBQVEsRUFBRTt3QkFFaEUscUJBQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsVUFBUSxTQUFTLFdBQVEsRUFBRSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsRUFBQTs7bUNBQXpGLFNBQXlGOzhCQUU1RixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLG9DQUFxQyxDQUFDLENBQUM7bUNBQzdELEdBQUcsQ0FBQyxDQUFDLENBQUM7aUNBR1IsUUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7aUNBRXpCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDO3FDQUd0RSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNO3dCQUN0RCxNQUFNLElBQUksMlVBTUksVUFBVSxnQ0FDZCxDQUFDO3VDQUdRLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO3dCQUMxRCxNQUFNLEdBQUcsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO3dCQUV0QyxxQkFBTSxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsR0FBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUE7O3NDQUE3RCxTQUE2RDt3QkFDL0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLENBQUE7Ozt3QkFoQ0YsQ0FBQyxFQUFFLENBQUE7Ozs7OztLQXNDeEM7SUFFTCxZQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQzs7QUFHRCxJQUFJLE9BQU8sR0FBRyxVQUFDLElBQWM7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUN6QyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLE1BQU07WUFDbEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUNGLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyJ9