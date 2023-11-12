"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./_quiggle/data/db");
const server_1 = require("./_quiggle/server");
const connection = new Promise((resolve, reject) => {
    const db = new db_1.QuiggleDatabase('+host/pbj');
    try {
        db.serve('Database connected', startServer);
        resolve(db);
    }
    catch (err) {
        reject(err);
    }
})
    .then((db) => {
    // unknown
})
    .catch((err) => {
    // unknown
});
function startServer() {
    const server = new server_1.QuiggleServer(6047, 'PBJ');
    const { app } = server;
    app.get('/', (req, res) => res.send('data'));
    server.serve();
}
