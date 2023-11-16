"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuiggleRender = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
class QuiggleRender {
    constructor(pageAddress, options) {
        this.placeholder = {
            find: (value) => {
                var _a;
                return (_a = value.match(config_1.CONFIG.regex.content)) !== null && _a !== void 0 ? _a : null;
            },
            serialize: (value, placeholders) => {
                placeholders.forEach((ph, i) => {
                    value = replaceAllInString(value, ph, `!@#$%^&*${i}`);
                });
                return value;
            },
            use: () => {
                console.log('use it!');
            }
        };
        if (typeof pageAddress !== 'string')
            throw utils_1.QuiggleErr.expectedString(pageAddress);
        if (pageAddress.split('/').length > 0) {
            const [layout, page] = pageAddress.split('/');
            this.layout = this.getTextFromFile('layout', 'error');
            const placeholders = this.placeholder.find(this.layout);
            if (placeholders)
                this.layout = this.placeholder.serialize(this.layout, uniqueArrayValues(placeholders));
            this.logic(placeholders[0]);
        }
        else
            this.layout = this.getTextFromFile('layout');
        this.page = pageAddress;
    }
    getTextFromFile(pathname, filename = 'default') {
        if (filename.split('.').length === 1)
            filename += '.html';
        return fs_1.default.readFileSync(path_1.default.join('.', 'client', pathname, filename), 'utf-8');
    }
    logic(value) {
        value = String(value).replace('{!', '').replace('!}', '').trim();
        const commandLines = value.split('\n');
    }
}
exports.QuiggleRender = QuiggleRender;
function uniqueArrayValues(arr) {
    const newArray = [];
    arr.forEach((item, i, a) => {
        if (!newArray.includes(item))
            newArray.push(item);
    });
    return newArray;
}
function replaceAllInString(value, find, insert) {
    return value.replace(new RegExp(find, 'g'), insert ? insert : '');
}
