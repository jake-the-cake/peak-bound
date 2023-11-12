"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuiggleServer = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./middleware");
class QuiggleServer {
    constructor(...args) {
        this.app = (0, middleware_1.useBasicMiddleware)((0, express_1.default)());
        this.app.use(this.requestPing);
        args.forEach(arg => {
            if (typeof arg === 'function')
                this.app.use('*', arg);
            if (typeof arg === 'string' && !this.name)
                this.name = arg;
            if (typeof arg === 'number' && !this.port)
                this.port = arg;
        });
    }
    requestPing(req, res, next) {
        console.log('Requesting path ->', req.url);
        next();
    }
    noping() {
        this.app._router.stack = this.app._router.stack.filter((route) => route.name !== 'requestPing');
        return this;
    }
    serve(...args) {
        const server = {
            name: this.name || 'Quiggle',
            port: this.port || 3000,
            callbacks: [],
            message: () => console.log(`${server.name} server is connected on port ${server.port}.`)
        };
        args.forEach(arg => {
            if (typeof arg === 'function')
                server.callbacks.push(arg);
            if (typeof arg === 'string')
                server.callbacks.push(() => { console.log(arg); });
            if (typeof arg === 'number' && !this.port)
                server.port = arg;
            if (arg === null)
                server.message = null;
        });
        this.app.listen(server.port, () => {
            if (server.message !== null && typeof server.message === 'function')
                server.message();
            server.callbacks.forEach(cb => cb());
        });
    }
}
exports.QuiggleServer = QuiggleServer;
