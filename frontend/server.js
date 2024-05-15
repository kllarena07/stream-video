import express from 'express';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const staticDir = path.join(__dirname, 'src');

const wss = new WebSocketServer({ host: "127.0.0.1", port: 8080 });

wss.addListener("connection", ws => {
  ws.on('message', (data) => {
    console.log(data);
  });
});

app.use(express.static(staticDir));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
