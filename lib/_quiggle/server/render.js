"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuiggleRender = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
class QuiggleRender {
    constructor(pageAddress, options) {
        if (typeof pageAddress !== 'string')
            throw utils_1.QuiggleErr.expectedString(pageAddress);
        if (pageAddress && typeof pageAddress === 'string' && pageAddress.split('/').length > 0) {
            const [layout, page] = pageAddress.split('/');
            console.log(layout, page);
        }
        const data = fs_1.default.readFileSync('./client/layout/default.html', 'utf-8');
        this.layout = data;
        this.page = pageAddress;
    }
}
exports.QuiggleRender = QuiggleRender;
