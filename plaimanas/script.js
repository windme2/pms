document.addEventListener("DOMContentLoaded", () => {
  // Main Initialization
  initLanguageToggle();
  initNavigation();
  initStickyHeader();
  initEditorialSubmenu();
  initSpacebarLogic();
  initCollectionHoverVideo();
  initFAQSystem();
  initInquiryForm();
});

/* ═══════════════════════════════════════
   1. LANGUAGE TOGGLE (TH-THB ↔ US-USD)
   ═══════════════════════════════════════ */
function initLanguageToggle() {
  const langSelector = document.getElementById("langSelector");
  const langCurrent = document.getElementById("langCurrent");
  if (!langSelector || !langCurrent) return;

  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.addEventListener("click", function (e) {
      e.stopPropagation();
      const currentText = langCurrent.textContent.trim();
      langCurrent.textContent = this.dataset.lang;
      this.dataset.lang = currentText;
      this.textContent = currentText;

      langSelector.style.pointerEvents = "none";
      setTimeout(() => (langSelector.style.pointerEvents = ""), 300);
    });
  });
}

/* ═══════════════════════════════════════
   2. NAVIGATION (Hamburger Menu)
   ═══════════════════════════════════════ */
function initNavigation() {
  const hamburger = document.getElementById("hamburger");
  const navMain = document.getElementById("navMain");

  if (hamburger && navMain) {
    hamburger.addEventListener("click", () => {
      navMain.classList.toggle("open");
      hamburger.classList.toggle("active");
    });
  }
}

/* ═══════════════════════════════════════
   3. STICKY HEADER (Shadow on scroll)
   ═══════════════════════════════════════ */
function initStickyHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });
}

/* ═══════════════════════════════════════
   4. EDITORIAL SUBMENU (Align to button)
   ═══════════════════════════════════════ */
function initEditorialSubmenu() {
  const editorialBtn = document.getElementById("editorialBtn");
  const editorialSubmenu = document.getElementById("editorialSubmenu");
  const submenuContent = editorialSubmenu
    ? editorialSubmenu.querySelector(".submenu-content")
    : null;

  const positionSubmenu = () => {
    if (!editorialBtn || !submenuContent) return;
    const rect = editorialBtn.getBoundingClientRect();
    submenuContent.style.position = "absolute";
    submenuContent.style.left = rect.left + "px";
    submenuContent.style.top = rect.top + "px";
  };

  if (editorialBtn) {
    editorialBtn.addEventListener("mouseenter", positionSubmenu);
    window.addEventListener("resize", positionSubmenu);
    positionSubmenu();
  }
}

/* ═══════════════════════════════════════
   5. SPACEBAR LOGIC (Zoom Out -> Editorial)
   ═══════════════════════════════════════ */
function initSpacebarLogic() {
  const logoWrapper = document.getElementById("logoWrapper");
  const editorialOverlay = document.getElementById("editorialOverlay");
  let logoZoomed = false;

  document.addEventListener("keydown", (e) => {
    const isInput = ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName);
    if (e.code === "Space" && !isInput) {
      e.preventDefault();

      if (!logoZoomed) {
        // First press: zoom out logo
        logoWrapper?.classList.add("zoomed-out");
        logoZoomed = true;
      } else {
        // Subsequent presses: toggle editorial overlay
        editorialOverlay?.classList.toggle("active");
      }
    }
  });

  editorialOverlay?.addEventListener("click", () => {
    editorialOverlay.classList.remove("active");
  });
}

/* ═══════════════════════════════════════
   6. COLLECTION HOVER VIDEO
   ═══════════════════════════════════════ */
function initCollectionHoverVideo() {
  document
    .querySelectorAll(".collection-large, .collection-small")
    .forEach((el) => {
      const hoverVideo = el.querySelector(".collection-hover-media video");
      if (!hoverVideo) return;

      el.addEventListener("mouseenter", () => {
        hoverVideo.currentTime = 0;
        hoverVideo.play().catch(() => console.log("Video play interrupted"));
      });

      el.addEventListener("mouseleave", () => {
        hoverVideo.pause();
        hoverVideo.currentTime = 0;
      });
    });
}

/* ═══════════════════════════════════════
   7. FAQ TABS + ACCORDION
   ═══════════════════════════════════════ */
function initFAQSystem() {
  const faqBadges = document.querySelectorAll(".faq-badge");
  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length === 0) return;

  const filterFAQs = (category) => {
    faqItems.forEach((item) => {
      item.classList.remove("active");
      item.classList.toggle("visible", item.dataset.category === category);
    });
  };

  filterFAQs("returns");

  faqBadges.forEach((badge) => {
    badge.addEventListener("click", () => {
      faqBadges.forEach((b) => b.classList.remove("active"));
      badge.classList.add("active");
      filterFAQs(badge.dataset.tab);
    });
  });

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach((other) => {
          if (
            other !== item &&
            other.dataset.category === item.dataset.category
          ) {
            other.classList.remove("active");
          }
        });
        item.classList.toggle("active", !isActive);
      });
    }
  });
}

/* ═══════════════════════════════════════
   8. INQUIRY FORM
   ═══════════════════════════════════════ */
function initInquiryForm() {
  const sendButton = document.querySelector(".send-button");
  if (sendButton) {
    sendButton.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Thank you! Your inquiry has been sent.");
    });
  }
}
