const main = async () => {
  const video = await new Promise((resolve) => {
    const search_interval = setInterval(() => {
      if (document.querySelector('video')) {
        clearInterval(search_interval);
        console.log("Successfully captured video element.");
        resolve(document.querySelector('video'));
      }
    }, 500);
  });

  video.pause();

  const ws = new WebSocket("ws://127.0.0.1:8080");
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  ws.addEventListener("open", () => {
    let is_playing = false;

    video.addEventListener("play", () => is_playing = true);
    video.addEventListener("pause", () => is_playing = false);

    const captureFrame = () => {
      if (is_playing) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
  
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        const imageDataURL = canvas.toDataURL('image/jpeg');
        console.log("Sending: ", imageDataURL);
  
        ws.send(imageDataURL);
      }

      requestAnimationFrame(captureFrame);
    };

    captureFrame();
  });

  ws.addEventListener("error", (error) => console.log(error));

  ws.addEventListener("close", () => ws.close());  
}
main();