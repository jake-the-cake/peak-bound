import express, { Express, NextFunction, Request, Response } from 'express'
import { useBasicMiddleware } from './middleware'

interface ServerInit {
  name: string
  port: number
  callbacks: Function[]
  message: (() => void) | null
}

class QuiggleServer {
	app: Express
  name?: string
  port?: number

	constructor(...args: any[]) {
		this.app = useBasicMiddleware(express())
    this.app.use(this.requestPing)
    args.forEach(arg =>{
      if (typeof arg === 'function') this.app.use('*', arg)
      if (typeof arg === 'string' && !this.name) this.name = arg
      if (typeof arg === 'number' && !this.port) this.port = arg
    })
	}
  
  requestPing (req: Request, res: Response, next: NextFunction) {
    console.log('Requesting path ->', req.url)
    next()
  }

  noping() {
    this.app._router.stack = this.app._router.stack.filter((route: any) => route.name !== 'requestPing')
    return this
  }

  serve(...args: any[]) {
    const server: ServerInit = {
      name: this.name || 'Quiggle',
      port: this.port || 3000,
      callbacks: [],
      message: () => console.log(`${ server.name } server is connected on port ${ server.port }.`)
    }
    args.forEach(arg => {
      if (typeof arg === 'function') server.callbacks.push(arg)
      if (typeof arg === 'string') server.callbacks.push(() => { console.log(arg)})
      if (typeof arg === 'number' && !this.port) server.port = arg
      if (arg === null) server.message = null
    })
    this.app.listen(server.port, () => {
      if (server.message !== null && typeof server.message === 'function') server.message()
      server.callbacks.forEach(cb => cb()) 
    })
  }
}

export {
  QuiggleServer
}