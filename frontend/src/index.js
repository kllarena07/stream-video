window.addEventListener("load", () => {
  const event_source = new EventSource(`http://127.0.0.1:3000/video`);

  event_source.addEventListener("message", (e) => {
    console.log(e);
  });
})