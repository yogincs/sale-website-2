/*
 * NatureNest customer setup: replace the demo values below with the property's
 * own contact details, social profiles, address and map search location.
 */
const NATURENEST_CONFIG = {
  contactNumber: "+00 0000 000000",
  whatsappNumber: "0000000000",
  emailAddress: "hello@example.com",
  fullAddress: "[Add full property address]",
  instagramUrl: "https://www.instagram.com/your-profile/",
  facebookUrl: "https://www.facebook.com/your-page/",
  mapsLocation: "YOUR_HOMESTAY_LOCATION",
  whatsappMessage: "Hello! I am interested in your homestay. Please share the room details and availability."
};

(() => {
  const config = NATURENEST_CONFIG;
  const navbar = document.querySelector(".site-nav");
  const navCollapse = document.querySelector("#mainNav");
  const year = document.querySelector("#currentYear");

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  const setActionLink = (link, href, isConfigured, setupHint, opensNewTab = false) => {
    link.href = isConfigured ? href : "#";
    if (isConfigured) {
      link.removeAttribute("aria-disabled");
      link.removeAttribute("title");
      link.classList.remove("is-unconfigured");
      if (opensNewTab) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      } else {
        link.removeAttribute("target");
        link.removeAttribute("rel");
      }
      return;
    }

    link.removeAttribute("target");
    link.removeAttribute("rel");
    link.setAttribute("aria-disabled", "true");
    link.title = setupHint;
    link.classList.add("is-unconfigured");
    link.addEventListener("click", (event) => event.preventDefault());
  };

  const whatsappUrl = (message) => {
    const digits = config.whatsappNumber.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  };

  const whatsappDigits = config.whatsappNumber.replace(/\D/g, "");
  const whatsappConfigured = whatsappDigits.length >= 7
    && whatsappDigits.length <= 15
    && !/^0+$/.test(whatsappDigits);
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    const roomName = link.dataset.room;
    const message = roomName
      ? `Hello! I am interested in the ${roomName}. Please share the details and availability.`
      : config.whatsappMessage;
    setActionLink(
      link,
      whatsappUrl(message),
      whatsappConfigured,
      "Add the property's WhatsApp number in js/script.js to activate this link.",
      true
    );
  });

  const contactDigits = config.contactNumber.replace(/\D/g, "");
  const phoneConfigured = contactDigits.length >= 7
    && contactDigits.length <= 15
    && !/^0+$/.test(contactDigits);
  document.querySelectorAll(".call-link").forEach((link) => {
    setActionLink(
      link,
      `tel:${config.contactNumber.replace(/[^\d+]/g, "")}`,
      phoneConfigured,
      "Add the property's contact number in js/script.js to activate this link."
    );
  });

  const emailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.emailAddress)
    && !config.emailAddress.toLowerCase().endsWith("@example.com");
  document.querySelectorAll(".email-link").forEach((link) => {
    setActionLink(
      link,
      `mailto:${config.emailAddress}`,
      emailConfigured,
      "Add the property's email address in js/script.js to activate this link."
    );
  });

  const hasConfiguredProfile = (profileUrl, expectedHosts, placeholderName) => {
    try {
      const profile = new URL(profileUrl);
      const profileName = profile.pathname.split("/").filter(Boolean)[0];
      return profile.protocol === "https:"
        && expectedHosts.includes(profile.hostname)
        && Boolean(profileName)
        && profileName.toLowerCase() !== placeholderName;
    } catch {
      return false;
    }
  };
  document.querySelectorAll(".instagram-link").forEach((link) => {
    setActionLink(
      link,
      config.instagramUrl,
      hasConfiguredProfile(config.instagramUrl, ["www.instagram.com", "instagram.com"], "your-profile"),
      "Add the property's Instagram profile URL in js/script.js to activate this link.",
      true
    );
  });
  document.querySelectorAll(".facebook-link").forEach((link) => {
    setActionLink(
      link,
      config.facebookUrl,
      hasConfiguredProfile(config.facebookUrl, ["www.facebook.com", "facebook.com"], "your-page"),
      "Add the property's Facebook page URL in js/script.js to activate this link.",
      true
    );
  });

  const mapsConfigured = Boolean(config.mapsLocation.trim())
    && config.mapsLocation !== "YOUR_HOMESTAY_LOCATION";
  document.querySelectorAll(".directions-link").forEach((link) => {
    setActionLink(
      link,
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.mapsLocation)}`,
      mapsConfigured,
      "Add the property's map location in js/script.js to activate this link.",
      true
    );
  });

  setText("[data-phone]", config.contactNumber);
  setText("[data-whatsapp-display]", config.whatsappNumber);
  setText("[data-email]", config.emailAddress);
  setText("[data-address]", config.fullAddress);
  if (year) year.textContent = String(new Date().getFullYear());

  const roomDetailsModal = document.querySelector("#roomDetailsModal");
  const roomModal = window.bootstrap.Modal.getOrCreateInstance(roomDetailsModal);
  document.querySelectorAll(".room-link").forEach((button) => {
    button.addEventListener("click", () => {
      const roomCard = button.closest(".room-card");
      const image = roomCard.querySelector(".room-image img");
      const details = roomCard.querySelectorAll(".room-meta span");
      const roomName = button.dataset.room;
      roomDetailsModal.querySelector("#roomDetailsTitle").textContent = roomName;
      const modalImage = roomDetailsModal.querySelector(".room-details-image");
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      roomDetailsModal.querySelector(".room-details-description").textContent =
        roomCard.querySelector(".room-body > p").textContent;
      roomDetailsModal.querySelector(".room-details-guests").textContent =
        details[0].textContent.trim();
      roomDetailsModal.querySelector(".room-details-bed").textContent =
        details[1].textContent.trim();
      roomDetailsModal.querySelector(".room-details-amount").textContent =
        roomCard.querySelector(".room-price").childNodes[0].textContent.trim();
      const enquiryLink = roomDetailsModal.querySelector(".room-details-enquiry");
      setActionLink(
        enquiryLink,
        whatsappUrl(`Hello! I am interested in the ${roomName}. Please share the details and availability.`),
        whatsappConfigured,
        "Add the property's WhatsApp number in js/script.js to activate this link.",
        true
      );
      roomModal.show();
    });
  });

  const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  };
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  navCollapse.addEventListener("show.bs.collapse", () => navbar.classList.add("menu-open"));
  navCollapse.addEventListener("hide.bs.collapse", () => navbar.classList.remove("menu-open"));
  navCollapse.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.bootstrap && window.innerWidth < 992) {
        window.bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const galleryButtons = [...document.querySelectorAll(".gallery-item")];
  const lightbox = document.querySelector("#galleryLightbox");
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxCount = lightbox.querySelector(".lightbox-count");
  const closeButton = lightbox.querySelector(".lightbox-close");
  let activeImageIndex = 0;
  let previousFocus = null;

  const showGalleryImage = (index) => {
    activeImageIndex = (index + galleryButtons.length) % galleryButtons.length;
    const image = galleryButtons[activeImageIndex].querySelector("img");
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCount.textContent = `${activeImageIndex + 1} / ${galleryButtons.length}`;
  };

  const openLightbox = (index) => {
    previousFocus = document.activeElement;
    showGalleryImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };

  galleryButtons.forEach((button, index) => {
    button.addEventListener("click", () => openLightbox(index));
  });
  closeButton.addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showGalleryImage(activeImageIndex - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => showGalleryImage(activeImageIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showGalleryImage(activeImageIndex - 1);
    if (event.key === "ArrowRight") showGalleryImage(activeImageIndex + 1);
    if (event.key === "Tab") {
      const focusable = [...lightbox.querySelectorAll("button:not([disabled])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!lightbox.contains(document.activeElement)) {
        event.preventDefault();
        closeButton.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
