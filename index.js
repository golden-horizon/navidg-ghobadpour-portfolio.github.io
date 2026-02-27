const bodyEl = document.querySelector("body");
const btn = document.getElementById("btn");

let isBgColorGrey = true;

function toggleBgColor() {
  bodyEl.style.backgroundColor = isBgColorGrey ? "blue" : "grey";
  isBgColorGrey = !isBgColorGrey;
}

btn.addEventListener("click", toggleBgColor);


const rect = document.getElementById("rect");

let position = -rect.offsetWidth;

function update() {
  rect.style.left = position + "px";
  position += 1.5; // slower = more premium feel

  if (position > window.innerWidth) {
    position = -rect.offsetWidth;
  }
}

function animate() {
  update();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

