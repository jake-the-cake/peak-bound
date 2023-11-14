import fs from 'fs'
import { QuiggleErr } from '../utils'

class QuiggleRender {
	layout?: string
	page?: string

	constructor(pageAddress: string, options: {}) {
		if (typeof pageAddress !== 'string') throw QuiggleErr.expectedString(pageAddress)
		if (pageAddress && typeof pageAddress === 'string' && pageAddress.split('/').length > 0) {
			const [layout, page] = pageAddress.split('/')
			this.layout = fs.readFileSync('./client/layout/' + layout + '.html', 'utf-8')
			if (layout === 'error') this.layout = this.layout.replace(/\{\!\s*error\.code\s*\!\}/g, '404')
			console.log(layout, page)
			// this.layout = data

		}
		this.page = pageAddress
	}
}

export {
	QuiggleRender
}