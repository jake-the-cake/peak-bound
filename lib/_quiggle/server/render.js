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
                    value = replaceAllInString(value, ph, QuiggleRender.placeholderString + i);
                });
                return value;
            },
            logic: (value) => {
                value = this.placeholder.strip(value);
                const commandLines = value.split('\n');
                return {
                    commandLines
                };
            },
            use: () => {
                console.log('use it!');
            },
            strip: (value) => {
                return String(value).replace('{!', '').replace('!}', '').trim();
            }
        };
        if (typeof pageAddress !== 'string')
            throw utils_1.QuiggleErr.expectedString(pageAddress);
        const [layout, page] = breakPathAtIndex(pageAddress.split('/'), 0, arrayPlaceholder(2, 'default', 'start'));
        this.html = QuiggleRender.getTextFromFile('layout', layout);
        const placeholders = this.placeholder.find(this.html);
        if (placeholders) {
            this.html = this.placeholder.serialize(this.html, uniqueArrayValues(placeholders));
            console.log(placeholders);
            this.checkMeta(placeholders);
            this.placeholder.logic(placeholders[0]);
        }
    }
    static getTextFromFile(pathname, filename = 'default') {
        if (filename.split('.').length === 1)
            filename += '.html';
        return fs_1.default.readFileSync(path_1.default.join('.', 'client', pathname, filename), 'utf-8');
    }
    checkMeta(data) {
        console.log(data);
        const entries = Object.entries(data);
        if (entries.length > 0) {
            entries.forEach((entry) => {
                if (entry[1].match(/\s*meta\.\s*/))
                    console.log('yay');
                this.parseFunction(entry[1]);
                console.log(entry, 'hi');
            });
        }
    }
    parseFunction(value) {
        const position = {
            start: null,
            end: null
        };
        const splitValue = this.placeholder.strip(value).split('');
        splitValue.forEach((char, index) => {
            if (position.start === null && char === '(')
                position.start = index;
            if (typeof position.start === 'number' && position.end === null) {
                console.log('no end');
                for (let i = splitValue.length - 1; i >= position.start; i--) {
                    console.log(i);
                    if (position.end === null && splitValue[i] === ')')
                        position.end = i;
                }
            }
        });
        if (typeof position.start === 'number'
            && typeof position.end === 'number'
            && position.start < position.end) {
            const f = value.slice(0, position.start);
            const props = value.slice(position.start + 1, position.end);
            console.log(f, props);
        }
        console.log(position);
    }
}
exports.QuiggleRender = QuiggleRender;
QuiggleRender.placeholderString = '!@#$%^&*';
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
function breakPathAtIndex(arr, index, callback) {
    console.log(arr, index);
    const chunks = [];
    if (index < 0)
        chunks.push(arr.slice(0, index).join('/'));
    chunks.push(arr.slice(index, 1).join('/'));
    if (index < arr.length - 1)
        chunks.push(arr.slice(index + 1).join('/'));
    if (callback && typeof callback === 'function')
        callback(chunks);
    console.log(chunks);
    return chunks;
}
function arrayPlaceholder(length, value, location) {
    return (arr) => {
        for (let i = arr.length; i < length; i++) {
            if (location === 'start')
                arr.unshift(value);
            if (location === 'end')
                arr.push(value);
        }
    };
}
