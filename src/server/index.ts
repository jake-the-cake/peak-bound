import express, { Express } from 'express'
import cors from 'cors'
import http from 'http'
import { CONFIG } from '../config'

interface ServerConfig {
  port?: number
  name?: string
}

function useBasicMiddleware(app: Express) {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  return app
}

function createExpressServer() {
  const app: Express = useBasicMiddleware(express())

  // custom middleware
  app.route('*').all(function (req, res, next) {
    console.log('Requesting path ->', req.url)
    next()
  })

  return app
}

function startServer({ port, name }: ServerConfig = {}): void {
  port = port ?? Number(CONFIG.conn.port)
  const app = http.createServer(createExpressServer())
  app.listen(3000, () => console.log('connected', port))
}

export { startServer }