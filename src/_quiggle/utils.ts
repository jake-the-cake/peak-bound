class QuiggleUtils {
	static aAn(value: string): string {
		if (QuiggleUtils.isVowel(value[0])) return 'an'
		return 'a'
	}

	static isVowel(value: string, variant?: string): boolean {
		const vowels: any = { upper: 'AEIOU', lower: 'aeiou'	}
		return new RegExp(`^[${ vowels[variant as string] ?? Object.values(vowels).join('')}]`).test(value)
	}
}

class QuiggleErr {
	static expectedString(value: string): Error {
		const valueType = typeof value
		return new SyntaxError(`Expected a string but received ${ QuiggleUtils.aAn(valueType) } ${ valueType }.`)
	}
}

export {
	QuiggleErr,
	QuiggleUtils
}