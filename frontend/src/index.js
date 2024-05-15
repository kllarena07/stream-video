const img = document.querySelector('img');
const ws = new WebSocket("ws://127.0.0.1:8080?type=reciever");

ws.addEventListener("open", () => {
  ws.addEventListener("message", ({ data }) => {
    img.src = data;
  });
});

ws.addEventListener("error", error => console.log(error));

ws.addEventListener("close", () => ws.close());
