"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const defaults = {
    host: '127.0.0.1'
};
const CONFIG = {
    regex: {
        content: new RegExp('\{\!.*?\!\}', 'g')
    },
    host: process.env.HOST_IP || defaults.host,
    db: {
        uri: process.env.MONGO_URI || process.env.MONGO_DEV || `mongodb://${defaults.host}:27017/no-db`
    }
};
exports.CONFIG = CONFIG;
