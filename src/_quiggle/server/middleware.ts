import express, { Express } from 'express'
import cors from 'cors'

/* basic middleware
		- use CORS and body-parser libs */
function useBasicMiddleware(app: Express) {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  return app
}

export {
	useBasicMiddleware
}