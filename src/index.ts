import { QuiggleDatabase } from "./_quiggle/data/db";
import { QuiggleServer } from "./_quiggle/server";
import { QuiggleRender } from "./_quiggle/server/render";

const connection = new Promise((resolve, reject) => {
  const db = new QuiggleDatabase('+host/pbj')
  try {
    db.serve('Database connected', startServer)
    resolve(db)
  }
  catch (err) {
    reject(err)
  }
})
.then((db) => {
  // unknown
})
.catch((err) => {
  // unknown
})

function startServer() {
  const server = new QuiggleServer(6047, 'PBJ')
  const { app } = server
  app.get('/', (req, res) => res.send('data'))
	app.get('/test', (req, res) => {
		new Promise((resolve, reject) => {
			const render = new QuiggleRender('error/home', {
				title: 'PBJ Service'
			})
			resolve(render)
		})
		.then((render) => res.send(render))
		// console.log(render)
		// res.send(render)
	})
  
  server.serve()
}