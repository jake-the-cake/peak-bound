"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuiggleDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
console.log('data');
class QuiggleDatabase {
    constructor(uri) {
        this.uri = uri ? this.parseUri(uri) : config_1.CONFIG.db.uri;
        console.log(this);
    }
    parseUri(uri) {
        if (uri.charAt(0) === '+') {
            const splitUri = uri.split('/');
            switch (splitUri[0].slice(1)) {
                case 'host':
                    return 'mongodb://' + config_1.CONFIG.host + ':27017/' + splitUri.slice(1).join('/');
                default:
                    return uri;
            }
        }
        return uri;
    }
    serve(message, ...callbacks) {
        mongoose_1.default.connect(this.uri)
            .then(() => {
            if (message)
                console.log(message);
            callbacks.forEach(callback => callback());
        });
    }
}
exports.QuiggleDatabase = QuiggleDatabase;
