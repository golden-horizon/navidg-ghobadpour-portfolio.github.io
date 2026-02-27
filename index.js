document.addEventListener("DOMContentLoaded", function () {

  /* ==============================
     BACKGROUND TOGGLE
  ============================== */
  const bodyEl = document.body;
  const btn = document.getElementById("btn");
  let isDark = true;

  if (btn) {
    btn.addEventListener("click", function () {
      bodyEl.style.backgroundColor = isDark ? "#1f2937" : "#0d1117";
      isDark = !isDark;
    });
  }

  /* ==============================
     MOVING BANNER
  ============================== */
  const rect = document.getElementById("rect");

  if (rect) {
    let position = -rect.offsetWidth;

    function updateBanner() {
      rect.style.left = position + "px";
      position += 1.5;

      if (position > window.innerWidth) {
        position = -rect.offsetWidth;
      }
    }

    function animateBanner() {
      updateBanner();
      requestAnimationFrame(animateBanner);
    }

    requestAnimationFrame(animateBanner);
  }

  /* ==============================
     MODAL
  ============================== */
  const dialog = document.getElementById("modal");
  const openButton = document.getElementById("open-modal-btn");
  const closeButton = document.getElementById("close-modal-btn");

  if (openButton && dialog) {
    openButton.addEventListener("click", function () {
      dialog.showModal();
    });
  }

  if (closeButton && dialog) {
    closeButton.addEventListener("click", function () {
      dialog.close();
    });
  }

  // Close modal when clicking outside it
  if (dialog) {
    dialog.addEventListener("click", function (event) {
      const rect = dialog.getBoundingClientRect();
      const isInside =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInside) {
        dialog.close();
      }
    });
  }

});

const dialog = document.getElementById("modal");
const openButton = document.getElementById("open-modal-btn");

if (openButton) {
  openButton.addEventListener("click", () => {
    dialog.showModal();
  });
}


function animate() {
  update();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

