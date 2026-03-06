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
  rect.style.left = pos + "px";
  pos += 1.5;
  if (pos > window.innerWidth) pos = -rect.offsetWidth;
  requestAnimationFrame(moveBanner);
}
requestAnimationFrame(moveBanner);

// Modal
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-modal-btn");
document.querySelectorAll(".open-modal").forEach(button => {
  button.addEventListener("click", () => {
    const project = button.dataset.project;
    if(project==="siem") modalBody.innerHTML = "<h2>Enterprise SIEM Implementation</h2><ul><li>Splunk log ingestion</li><li>AWS EC2 + IAM hardening</li><li>Threat detection rules</li></ul>";
    else if(project==="vpn") modalBody.innerHTML = "<h2>Site-to-Site IPsec VPN</h2><ul><li>IPsec configuration</li><li>Secure tunnel between sites</li><li>Firewall rule hardening</li></ul>";
    modal.showModal();
  });
});
closeBtn.addEventListener("click",()=>modal.close());

// Visitor Info
document.getElementById("browser").textContent = navigator.userAgent;
document.getElementById("platform").textContent = navigator.platform;
document.getElementById("screen").textContent = window.innerWidth + " x " + window.innerHeight;

// IP, City, Country
fetch("https://ipapi.co/json/")
  .then(res=>res.json())
  .then(data=>{
    document.getElementById("ip").textContent = data.ip||"Unavailable";
    document.getElementById("city").textContent = data.city||"Unavailable";
    document.getElementById("country").textContent = data.country_name||"Unavailable";
  })
  .catch(()=>{document.getElementById("ip").textContent="Unavailable"; document.getElementById("city").textContent="Unavailable"; document.getElementById("country").textContent="Unavailable";});

// Internet Speed Gauge
const canvas = document.getElementById("speedGauge");
const ctx = canvas.getContext("2d");
let currentSpeed = 0, targetSpeed = 0;

function drawGauge(speedPercent){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const centerX = canvas.width/2, centerY=canvas.height, radius=50;

  // semicircle
  ctx.beginPath();
  ctx.arc(centerX,centerY,radius,Math.PI,0,false);
  ctx.lineWidth=6; ctx.strokeStyle="#555"; ctx.stroke();

  // needle
  const angle = Math.PI - (speedPercent/100)*Math.PI;
  const x = centerX + radius*0.8*Math.cos(angle);
  const y = centerY + radius*0.8*Math.sin(angle);
  ctx.beginPath(); ctx.moveTo(centerX,centerY); ctx.lineTo(x,y); ctx.strokeStyle="#00bcd4"; ctx.lineWidth=4; ctx.stroke();

  // center
  ctx.beginPath(); ctx.arc(centerX,centerY,5,0,2*Math.PI); ctx.fillStyle="#00bcd4"; ctx.fill();
}

function updateSpeedValue(){
  targetSpeed = navigator.connection ? navigator.connection.downlink : Math.random()*10+1;
}

function animateNeedle(){
  currentSpeed += (targetSpeed - currentSpeed)*0.05;
  let speedPercent = Math.min(currentSpeed*10,100);
  drawGauge(speedPercent);
  document.getElementById("speedValue").textContent = currentSpeed.toFixed(1)+"M";
  requestAnimationFrame(animateNeedle);
}

setInterval(updateSpeedValue,2000);
updateSpeedValue();
animateNeedle();
