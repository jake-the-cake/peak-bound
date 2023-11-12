"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./_quiggle/server");
const server = new server_1.QuiggleServer(6047, 'PBJ');
server.app.get('/', (req, res) => res.send('data'));
server.serve();
