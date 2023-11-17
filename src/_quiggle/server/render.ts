import fs from 'fs'
import { QuiggleErr } from '../utils'
import { CONFIG } from '../config'
import path from 'path'



class QuiggleRender {
	html: string

	constructor(pageAddress: string, options: {}) {
		if (typeof pageAddress !== 'string') throw QuiggleErr.expectedString(pageAddress)
		const [layout, page] = breakPathAtIndex(pageAddress.split('/'), 0, arrayPlaceholder(2, 'default', 'start'))
		this.html = QuiggleRender.getTextFromFile('layout', layout)
		const placeholders = this.placeholder.find(this.html)
		if (placeholders) {
			this.html = this.placeholder.serialize(this.html, uniqueArrayValues(placeholders) as string[])
			this.placeholder.logic(placeholders[0])
		}
	}
	
	static getTextFromFile(pathname: string, filename: string = 'default'): string {
		if (filename.split('.').length === 1) filename += '.html'
		return fs.readFileSync(path.join('.', 'client', pathname, filename), 'utf-8')
	}
	
	static placeholderString = '!@#$%^&*'
	
	placeholder = {
		find: (value: string): string[] | null => {
			return value.match(CONFIG.regex.content) ?? null
		},
		serialize: (value: string, placeholders: string[]): string => {
			placeholders.forEach((ph: string, i: number) => {
				value = replaceAllInString(value, ph, QuiggleRender.placeholderString + i)
			})
			return value
		},
		logic: (value: string) => {
			value = String(value).replace('{!', '').replace('!}', '').trim()
			const commandLines = value.split('\n')
		},
		use: () => {
			console.log('use it!')
		}
	}
	

}

export {
	QuiggleRender
}

function uniqueArrayValues(arr: unknown[]): unknown[] {
	const newArray: unknown[] = []
	arr.forEach((item: unknown, i: number, a: any[]) => {
		if (!newArray.includes(item)) newArray.push(item)
	})
return newArray
}

function replaceAllInString(value: string, find: string, insert?: string): string {
	return value.replace(new RegExp(find, 'g'), insert ? insert : '')
}

function breakPathAtIndex (arr: string[], index: number, callback?: (chunks: any[]) => void) {
	console.log(arr, index)
	const chunks: string[] = []
	if (index < 0) chunks.push(arr.slice(0, index).join('/'))
	chunks.push(arr.slice(index, 1).join('/'))
	if (index < arr.length - 1) chunks.push(arr.slice(index + 1).join('/'))
	if (callback && typeof callback === 'function') callback(chunks)
	console.log(chunks)
	return chunks
}

function arrayPlaceholder(length: number, value: any, location: 'start' | 'end') {
	return (arr: any[]) => {
		for (let i = arr.length; i < length; i++) {
			if (location === 'start') arr.unshift(value)
			if (location === 'end') arr.push(value)
		}
	}
}