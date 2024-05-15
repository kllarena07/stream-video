import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import url, { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const staticDir = path.join(__dirname, 'src');

const wss = new WebSocketServer({ host: "127.0.0.1", port: 8080 });

let clients = [];

wss.addListener("connection", (ws, req) => {
  const { query: { id } } = url.parse(req.url, true);
  
  console.log("New connection, ", id);

  clients.push({
    id,
    socket: ws
  })

  ws.on('message', (data) => {
    for (let { id, socket } of clients) {
      if (id != "sender") socket.send(data.toString('utf-8'));
    }
  });
});

app.use(express.static(staticDir));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
