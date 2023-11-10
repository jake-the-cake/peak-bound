"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const config_1 = require("../config");
function useBasicMiddleware(app) {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    return app;
}
function createExpressServer() {
    const app = useBasicMiddleware((0, express_1.default)());
    // custom middleware
    app.route('*').all(function (req, res, next) {
        console.log('Requesting path ->', req.url);
        next();
    });
    return app;
}
function startServer({ port, name } = {}) {
    port = port !== null && port !== void 0 ? port : Number(config_1.CONFIG.conn.port);
    const app = http_1.default.createServer(createExpressServer());
    app.listen(3000, () => console.log('connected', port));
}
exports.startServer = startServer;
