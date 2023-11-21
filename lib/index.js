"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./_quiggle/data/db");
const server_1 = require("./_quiggle/server");
const render_1 = require("./_quiggle/server/render");
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
    app.get('/test', (req, res) => {
        new Promise((resolve, reject) => {
            try {
                const render = new render_1.QuiggleRender('home', {
                    title: 'PBJ Service'
                });
                resolve(render);
            }
            catch (err) {
                reject(err);
            }
        })
            .then((render) => res.send(render))
            .catch((err) => res.send(err));
    });
    server.serve();
}
