"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CONFIG = {
    conn: {
        port: (_d = (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a.SERVER_PORT) !== null && _b !== void 0 ? _b : (_c = process.env) === null || _c === void 0 ? void 0 : _c.PORT) !== null && _d !== void 0 ? _d : 6047
    }
};
exports.CONFIG = CONFIG;
