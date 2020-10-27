"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppsConfigHandler = /** @class */ (function () {
    function AppsConfigHandler() {
    }
    AppsConfigHandler.prototype.app1Route = function (req) {
        var _a;
        var app1MainRoute = (_a = req.url) === null || _a === void 0 ? void 0 : _a.includes('/app1');
        if (app1MainRoute) {
            return { target: 'http://localhost:3001' };
        }
    };
    AppsConfigHandler.prototype.app2Route = function (req) {
        var _a;
        var app1MainRoute = (_a = req.url) === null || _a === void 0 ? void 0 : _a.includes('/app2');
        if (app1MainRoute) {
            return { target: 'http://localhost:3002' };
        }
    };
    return AppsConfigHandler;
}());
exports.default = AppsConfigHandler;
