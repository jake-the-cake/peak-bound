import fs from 'fs'
import { QuiggleErr } from '../utils'

class QuiggleRender {
	layout?: string
	page?: string

	constructor(pageAddress: string, options: {}) {
		if (typeof pageAddress !== 'string') throw QuiggleErr.expectedString(pageAddress)
		if (pageAddress && typeof pageAddress === 'string' && pageAddress.split('/').length > 0) {
			const [layout, page] = pageAddress.split('/')
			console.log(layout, page)
		}
		const data = fs.readFileSync('./client/layout/default.html', 'utf-8')
		this.layout = data
		this.page = pageAddress
	}
}

export {
	QuiggleRender
}