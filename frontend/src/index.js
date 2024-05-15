const submit = document.querySelector("button")
const input = document.querySelector("input")
const pre = document.querySelector("pre")
submit.addEventListener("click", async () => {
  const response = await fetch(`http://127.0.0.1:5000/endpoint/${input.value}`)
  const json = await response.json()
  pre.textContent = JSON.stringify(json)
})