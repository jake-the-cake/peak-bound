import express, { Express } from 'express'
import cors from 'cors'
import http from 'http'

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
  const app = http.createServer(createExpressServer())
  app.listen(3000, () => console.log('connected'))
}

export { startServer }