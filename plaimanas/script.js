document.addEventListener("DOMContentLoaded", function () {
  /* ═══════════════════════════════════════
     LANGUAGE TOGGLE (TH-THB ↔ US-USD)
     ═══════════════════════════════════════ */
  const langSelector = document.getElementById("langSelector");
  const langCurrent = document.getElementById("langCurrent");

  document.querySelectorAll(".lang-option").forEach(function (opt) {
    opt.addEventListener("click", function (e) {
      e.stopPropagation();
      const currentText = langCurrent.textContent.trim();
      langCurrent.textContent = this.dataset.lang;
      this.dataset.lang = currentText;
      this.textContent = currentText;
    });
  });

  /* ═══════════════════════════════════════
     HAMBURGER MENU (mobile nav toggle)
     ═══════════════════════════════════════ */
  const hamburger = document.getElementById("hamburger");
  const navMain = document.getElementById("navMain");

  if (hamburger && navMain) {
    hamburger.addEventListener("click", function () {
      navMain.classList.toggle("open");
      hamburger.classList.toggle("active");
    });
  }

  /* ═══════════════════════════════════════
     STICKY HEADER — shadow on scroll
     ═══════════════════════════════════════ */
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  /* ═══════════════════════════════════════
     EDITORIAL SUBMENU — align to button
     ═══════════════════════════════════════ */
  const editorialBtn = document.getElementById("editorialBtn");
  const editorialSubmenu = document.getElementById("editorialSubmenu");
  const submenuContent = editorialSubmenu
    ? editorialSubmenu.querySelector(".submenu-content")
    : null;

  function positionSubmenu() {
    if (!editorialBtn || !submenuContent) return;
    const rect = editorialBtn.getBoundingClientRect();
    submenuContent.style.left = rect.left + "px";
    submenuContent.style.transform = "none";
  }

  if (editorialBtn) {
    editorialBtn.addEventListener("mouseenter", positionSubmenu);
    window.addEventListener("resize", positionSubmenu);
    positionSubmenu();
  }

  /* ═══════════════════════════════════════
     SPACEBAR LOGIC (Sequence: Zoom Out -> Editorial)
     ═══════════════════════════════════════ */
  const logoWrapper = document.getElementById("logoWrapper");
  const editorialOverlay = document.getElementById("editorialOverlay");
  let spaceStep = 0; // 0: Normal, 1: Zoomed Out, 2: Editorial Active

  document.addEventListener("keydown", function (e) {
    // เช็คว่ากด Spacebar และไม่ได้กำลังพิมพ์อยู่ใน Input หรือ Select
    if (
      e.code === "Space" &&
      e.target.tagName !== "INPUT" &&
      e.target.tagName !== "TEXTAREA" &&
      e.target.tagName !== "SELECT"
    ) {
      e.preventDefault();
      spaceStep++;

      if (spaceStep === 1) {
        // ขั้นที่ 1: ค่อยๆ ย่อโลโก้ (Zoom Out)
        if (logoWrapper) logoWrapper.classList.add("zoomed-out");
      } else if (spaceStep === 2) {
        // ขั้นที่ 2: เปิดหน้า Editorial สีดำเต็มหน้าจอ
        if (editorialOverlay) editorialOverlay.classList.add("active");
      } else {
        // ขั้นที่ 3: Reset ทุกอย่างกลับมาเริ่มต้น
        spaceStep = 0;
        if (logoWrapper) logoWrapper.classList.remove("zoomed-out");
        if (editorialOverlay) editorialOverlay.classList.remove("active");
      }
    }
  });

  // คลิกที่หน้า Editorial เพื่อปิดและ Reset step
  if (editorialOverlay) {
    editorialOverlay.addEventListener("click", function () {
      spaceStep = 0;
      editorialOverlay.classList.remove("active");
      if (logoWrapper) logoWrapper.classList.remove("zoomed-out");
    });
  }

  /* ═══════════════════════════════════════
     COLLECTION HOVER VIDEO
     ═══════════════════════════════════════ */
  const collectionLarge = document.querySelector(".collection-large");
  if (collectionLarge) {
    const hoverMedia = collectionLarge.querySelector(".collection-hover-media");
    if (hoverMedia) {
      const video = hoverMedia.querySelector("video");
      collectionLarge.addEventListener("mouseenter", function () {
        if (video)
          video.play().catch((e) => console.log("Video play interrupted"));
      });
      collectionLarge.addEventListener("mouseleave", function () {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }

  /* ═══════════════════════════════════════
     FAQ TABS + ACCORDION
     ═══════════════════════════════════════ */
  const faqBadges = document.querySelectorAll(".faq-badge");
  const faqItems = document.querySelectorAll(".faq-item");

  function filterFAQs(category) {
    faqItems.forEach(function (item) {
      item.classList.remove("active");
      if (item.dataset.category === category) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });
  }

  // เริ่มต้นด้วยหน้า Returns
  if (faqItems.length > 0) filterFAQs("returns");

  faqBadges.forEach(function (badge) {
    badge.addEventListener("click", function () {
      faqBadges.forEach(function (b) {
        b.classList.remove("active");
      });
      badge.classList.add("active");
      filterFAQs(badge.dataset.tab);
    });
  });

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", function () {
        const isActive = item.classList.contains("active");
        // ปิดอันอื่นในหมวดเดียวกัน
        faqItems.forEach(function (other) {
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

  /* ═══════════════════════════════════════
     INQUIRY FORM
     ═══════════════════════════════════════ */
  const sendButton = document.querySelector(".send-button");
  if (sendButton) {
    sendButton.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Thank you! Your inquiry has been sent.");
    });
  }
});
