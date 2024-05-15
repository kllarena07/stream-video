const img = document.querySelector('img');

const generate_uid = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const uid = generate_uid(7);

const ws = new WebSocket(`ws://127.0.0.1:8080?type=reciever&uid=${uid}`);

ws.addEventListener("open", () => {
  ws.addEventListener("message", ({ data }) => {
    img.src = data;
  });
});

ws.addEventListener("error", error => console.log(error));

ws.addEventListener("close", () => ws.close());
