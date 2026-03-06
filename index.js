// Background Toggle
const bodyEl = document.querySelector("body");
const btn = document.getElementById("btn");
let isBgGrey = true;
btn.addEventListener("click", () => {
  bodyEl.style.backgroundColor = isBgGrey ? "blue" : "#0d1117";
  isBgGrey = !isBgGrey;
});

// Moving Banner
const rect = document.getElementById("rect");
let pos = -rect.offsetWidth;

function moveBanner() {
  // recalc width each frame in case window resized
  const bannerWidth = rect.offsetWidth;
  
  // move the banner
  rect.style.transform = `translateX(${pos}px)`;
  pos += 2; // speed in px/frame
  
  // reset if fully off screen
  if(pos > window.innerWidth) pos = -bannerWidth;
  
  requestAnimationFrame(moveBanner);
}

requestAnimationFrame(moveBanner);

// Visitor Info
document.getElementById("browser").textContent = navigator.userAgent;
document.getElementById("platform").textContent = navigator.platform;
document.getElementById("screen").textContent = window.innerWidth + "x" + window.innerHeight;

// Fetch IP and Geo
// Fetch IP & location (live server required)
// Fetch IP, City, Country
fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip || "Unavailable";
    document.getElementById("city").textContent = data.city || "Unavailable";
    document.getElementById("country").textContent = data.country_name || "Unavailable";
  })
  .catch(()=>{ 
    document.getElementById("ip").textContent="Unavailable";
    document.getElementById("city").textContent="Unavailable";
    document.getElementById("country").textContent="Unavailable";
  });
// Internet Speed Gauge
const canvas = document.getElementById("speedGauge");
const ctx = canvas.getContext("2d");

function drawGauge(speed){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // semi-circle
  ctx.beginPath();
  ctx.arc(50,50,40,Math.PI,0,false);
  ctx.strokeStyle="#444";
  ctx.lineWidth=5;
  ctx.stroke();
  // needle
  let angle = Math.PI + (speed/100)*Math.PI;
  ctx.beginPath();
  ctx.moveTo(50,50);
  ctx.lineTo(50 + 35*Math.cos(angle),50 + 35*Math.sin(angle));
  ctx.strokeStyle="#0ff";
  ctx.lineWidth=3;
  ctx.stroke();
}

function updateSpeed(){
  let speed = navigator.connection ? navigator.connection.downlink : Math.floor(Math.random()*100);
  document.getElementById("speedValue").textContent = speed + "M";
  drawGauge(speed);
}
updateSpeed();
setInterval(updateSpeed,2000);
