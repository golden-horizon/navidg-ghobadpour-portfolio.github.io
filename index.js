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

// Modal for Projects
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-modal-btn");

document.querySelectorAll(".open-modal").forEach(button => {
  button.addEventListener("click", () => {
    const project = button.dataset.project;
    if (project === "siem") {
      modalBody.innerHTML = `
        <h2>Enterprise SIEM Implementation</h2>
        <ul>
          <li>Splunk log ingestion</li>
          <li>AWS EC2 + IAM hardening</li>
          <li>Threat detection rules</li>
        </ul>
      `;
    } else if (project === "vpn") {
      modalBody.innerHTML = `
        <h2>Site-to-Site IPsec VPN</h2>
        <ul>
          <li>IPsec configuration</li>
          <li>Secure tunnel between sites</li>
          <li>Firewall rule hardening</li>
        </ul>
      `;
    }
    modal.showModal();
  });
});

closeBtn.addEventListener("click", () => modal.close());

// Visitor info
document.getElementById("browser").textContent = navigator.userAgent;
document.getElementById("platform").textContent = navigator.platform;
document.getElementById("screen").textContent = `${window.innerWidth} x ${window.innerHeight}`;

fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip;
    document.getElementById("city").textContent = data.city;
    document.getElementById("country").textContent = data.country_name;
  })
  .catch(() => {
    document.getElementById("ip").textContent = "Unavailable";
    document.getElementById("city").textContent = "N/A";
    document.getElementById("country").textContent = "N/A";
  });

// Speedometer
const canvas = document.getElementById("speedGauge");
const ctx = canvas.getContext("2d");

function drawGauge(speedPercent){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height;
  const radius = 50;

  // semicircle background
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#555";
  ctx.stroke();

  // needle
  const angle = Math.PI - (speedPercent / 100) * Math.PI; // 180deg to 0deg
  const x = centerX + radius * 0.8 * Math.cos(angle);
  const y = centerY + radius * 0.8 * Math.sin(angle);

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#00bcd4";
  ctx.lineWidth = 4;
  ctx.stroke();

  // center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#00bcd4";
  ctx.fill();
}

function updateSpeed() {
  let speed = navigator.connection ? navigator.connection.downlink : Math.random() * 10 + 1;
  let speedPercent = Math.min(speed * 10, 100);
  drawGauge(speedPercent);
  document.getElementById("speedValue").textContent = speed.toFixed(1) + "M";
}

setInterval(updateSpeed, 1000);
updateSpeed();
}

function updateSpeed() {
  let speed = navigator.connection ? navigator.connection.downlink : Math.random() * 10 + 1;
  let speedPercent = Math.min(speed*10, 100);
  drawGauge(speedPercent);
  document.getElementById("speedValue").textContent = speed.toFixed(1) + "M";
}

setInterval(updateSpeed, 1000);
updateSpeed();
