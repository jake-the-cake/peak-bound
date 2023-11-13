import fs from 'fs'

class QuiggleRender {
	layout?: string
	page?: string

	constructor(page: string, options: {}) {
		const data = fs.readFileSync('./client/layout/default.html', 'utf-8')
		this.layout = data
		this.page = page
	}
}

export {
	QuiggleRender
}