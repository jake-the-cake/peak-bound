import { QuiggleServer } from "./_quiggle/server";

const server = new QuiggleServer(6047, 'PBJ')

server.app.get('/', (req, res) => res.send('data'))

server.serve()