// Background Toggle
const bodyEl = document.querySelector("body");
const btn = document.getElementById("btn");
let isBgGrey = true;
btn.addEventListener("click", () => {
  bodyEl.style.backgroundColor = isBgGrey ? "blue" : "#0d1117";
  isBgGrey = !isBgGrey;
});

// Visitor Info
document.getElementById("browser").textContent = navigator.userAgent;
document.getElementById("platform").textContent = navigator.platform;
document.getElementById("screen").textContent = window.innerWidth + " x " + window.innerHeight;

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
let currentSpeed = 0;

function drawGauge(speed){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const cx = canvas.width/2, cy = canvas.height, r=50;

  // semi-circle
  ctx.beginPath();
  ctx.arc(cx,cy,r,Math.PI,0);
  ctx.strokeStyle="#555"; ctx.lineWidth=6; ctx.stroke();

  // needle
  const angle = Math.PI - Math.min(speed,10)/10 * Math.PI;
  const nx = cx + r*0.8*Math.cos(angle);
  const ny = cy + r*0.8*Math.sin(angle);
  ctx.beginPath();
  ctx.moveTo(cx,cy);
  ctx.lineTo(nx,ny);
  ctx.strokeStyle="#00bcd4";
  ctx.lineWidth=4;
  ctx.stroke();

  // center
  ctx.beginPath();
  ctx.arc(cx,cy,5,0,2*Math.PI);
  ctx.fillStyle="#00bcd4";
  ctx.fill();
}

function updateSpeed(){
  let targetSpeed = navigator.connection ? navigator.connection.downlink : Math.random()*10;
  currentSpeed += (targetSpeed - currentSpeed)*0.05;
  drawGauge(currentSpeed);
  document.getElementById("speedValue").textContent = currentSpeed.toFixed(1)+"M";
  requestAnimationFrame(updateSpeed);
}

updateSpeed();
