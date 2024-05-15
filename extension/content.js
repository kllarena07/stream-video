const ws = new WebSocket("ws://127.0.0.1:8080");

ws.addEventListener("open", () => {
  setInterval(() => {
    ws.send("Hello!");
  }, 1000);
});

ws.addEventListener("error", (error) => console.log(error));

ws.addEventListener("close", () => ws.close());