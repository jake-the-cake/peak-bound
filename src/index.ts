import { QuiggleDatabase } from "./_quiggle/data/db";
import { QuiggleServer } from "./_quiggle/server";

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
  
  server.serve()
}