const img = document.querySelector('img');
const ws = new WebSocket("ws://127.0.0.1:8080?id=reciever");

ws.addEventListener("open", () => {
  ws.addEventListener("message", ({ data }) => {
    img.src = data;
  });
});

ws.addEventListener("error", error => console.log(error));

ws.addEventListener("close", () => ws.close());
// const event_source = new EventSource(`http://127.0.0.1:3000/video`);

// event_source.addEventListener("message", (e) => {
//   img.src = e.data;
// });
