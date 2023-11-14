"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuiggleUtils = exports.QuiggleErr = void 0;
class QuiggleUtils {
    static aAn(value) {
        if (QuiggleUtils.isVowel(value[0]))
            return 'an';
        return 'a';
    }
    static isVowel(value, variant) {
        var _a;
        const vowels = { upper: 'AEIOU', lower: 'aeiou' };
        return new RegExp(`^[${(_a = vowels[variant]) !== null && _a !== void 0 ? _a : Object.values(vowels).join('')}]`).test(value);
    }
}
exports.QuiggleUtils = QuiggleUtils;
class QuiggleErr {
    static expectedString(value) {
        const valueType = typeof value;
        return new SyntaxError(`Expected a string but received ${QuiggleUtils.aAn(valueType)} ${valueType}.`);
    }
}
exports.QuiggleErr = QuiggleErr;
