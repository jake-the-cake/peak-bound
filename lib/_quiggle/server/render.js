"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuiggleRender = void 0;
const fs_1 = __importDefault(require("fs"));
class QuiggleRender {
    constructor(page, options) {
        const data = fs_1.default.readFileSync('./client/layout/default.html', 'utf-8');
        this.layout = data;
        this.page = page;
    }
}
exports.QuiggleRender = QuiggleRender;
