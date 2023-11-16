import fs from 'fs'
import { QuiggleErr } from '../utils'
import { CONFIG } from '../config'
import path from 'path'



class QuiggleRender {
	layout?: string
	page?: string

	constructor(pageAddress: string, options: {}) {
		if (typeof pageAddress !== 'string') throw QuiggleErr.expectedString(pageAddress)
		if (pageAddress.split('/').length > 0) {
			const [layout, page] = pageAddress.split('/')
			this.layout = this.getTextFromFile('layout', 'error')
			const placeholders = this.placeholder.find(this.layout)
			if (placeholders) this.layout = this.placeholder.serialize(this.layout, uniqueArrayValues(placeholders) as string[])
			this.logic(placeholders![0])
		}
		else this.layout = this.getTextFromFile('layout')
		this.page = pageAddress
	}

	getTextFromFile(pathname: string, filename: string = 'default'): string {
		if (filename.split('.').length === 1) filename += '.html'
		return fs.readFileSync(path.join('.', 'client', pathname, filename), 'utf-8')
	}

	placeholder = {
		find: (value: string): string[] | null => {
			return value.match(CONFIG.regex.content) ?? null
		},
		serialize: (value: string, placeholders: string[]): string => {
			placeholders.forEach((ph: string, i: number) => {
				value = replaceAllInString(value, ph, `!@#$%^&*${ i }`)
			})
			return value
		},
		use: () => {
			console.log('use it!')
		}
	}

	logic(value: string) {
		value = String(value).replace('{!', '').replace('!}', '').trim()
		const commandLines = value.split('\n')
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