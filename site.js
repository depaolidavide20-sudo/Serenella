const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const carousels = document.querySelectorAll("[data-carousel]");
const modalTriggers = document.querySelectorAll("[data-modal-open]");
const modals = document.querySelectorAll("[data-modal]");
const bookingForms = document.querySelectorAll("[data-booking-form]");
const languageLinks = document.querySelectorAll("[data-lang-switch]");
const root = document.documentElement;
const hero = document.querySelector(".hero");
const mobileCta = document.querySelector(".mobile-cta");
const mobileHeroQuery = window.matchMedia("(max-width: 720px)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const whatsappNumber = "393345037344";
const mapIframe = document.querySelector("[data-map-iframe]");
const mapConsent = document.querySelector("[data-map-consent]");
const mapAccept = document.querySelector("[data-map-accept]");
const mapConsentKey = "serenellaGoogleMapsConsent";
const mapConsentDuration = 1000 * 60 * 60 * 24 * 183;
const originalTitle = document.title;
const metaDescription = document.querySelector('meta[name="description"]');
const originalDescription = metaDescription?.getAttribute("content") || "";

const originalHtml = new Map();
const originalTextNodes = new Map();
const originalAttributes = new Map();

function rememberHtml(element) {
  if (!originalHtml.has(element)) {
    originalHtml.set(element, element.innerHTML);
  }
}

function rememberTextNode(node) {
  if (!originalTextNodes.has(node)) {
    originalTextNodes.set(node, node.textContent);
  }
}

function rememberAttribute(element, attribute) {
  const stored = originalAttributes.get(element) || {};

  if (!(attribute in stored)) {
    stored[attribute] = element.getAttribute(attribute);
    originalAttributes.set(element, stored);
  }
}

function setFullText(selector, text) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  rememberHtml(element);
  element.textContent = text;
}

function setAllFullText(selector, texts) {
  document.querySelectorAll(selector).forEach((element, index) => {
    const text = Array.isArray(texts) ? texts[index] ?? texts[texts.length - 1] : texts;
    rememberHtml(element);
    element.textContent = text;
  });
}

function setInlineText(selector, text) {
  const element = document.querySelector(selector);

  if (!element) {
    return;
  }

  const textNodes = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE);
  const primaryNode = textNodes.find((node) => node.textContent.trim());

  if (!primaryNode) {
    element.append(document.createTextNode(` ${text}`));
    return;
  }

  rememberTextNode(primaryNode);
  primaryNode.textContent = ` ${text} `;

  textNodes
    .filter((node) => node !== primaryNode && node.textContent.trim())
    .forEach((node) => {
      rememberTextNode(node);
      node.textContent = "";
    });
}

function setAllInlineText(selector, texts) {
  document.querySelectorAll(selector).forEach((element, index) => {
    const text = Array.isArray(texts) ? texts[index] ?? texts[texts.length - 1] : texts;
    const textNodes = [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE);
    const primaryNode = textNodes.find((node) => node.textContent.trim());

    if (!primaryNode) {
      element.append(document.createTextNode(` ${text}`));
      return;
    }

    rememberTextNode(primaryNode);
    primaryNode.textContent = ` ${text} `;

    textNodes
      .filter((node) => node !== primaryNode && node.textContent.trim())
      .forEach((node) => {
        rememberTextNode(node);
        node.textContent = "";
      });
  });
}

function setAttribute(selector, attribute, value) {
  document.querySelectorAll(selector).forEach((element) => {
    rememberAttribute(element, attribute);
    element.setAttribute(attribute, value);
  });
}

function restoreItalianCopy() {
  originalHtml.forEach((html, element) => {
    element.innerHTML = html;
  });

  originalTextNodes.forEach((text, node) => {
    node.textContent = text;
  });

  originalAttributes.forEach((attributes, element) => {
    Object.entries(attributes).forEach(([attribute, value]) => {
      if (value === null) {
        element.removeAttribute(attribute);
      } else {
        element.setAttribute(attribute, value);
      }
    });
  });

  document.title = originalTitle;
  metaDescription?.setAttribute("content", originalDescription);
}

function applyEnglishCopy() {
  document.title = "Bagni Serenella | Beach, food and cocktails in Cavi di Lavagna";
  metaDescription?.setAttribute(
    "content",
    "Bagni Serenella in Cavi di Lavagna: equipped beach, seafront restaurant, sunset cocktails, sports, hot tub, events and online umbrella booking."
  );

  [
    [".skip-link", "Skip to content"],
    ['.site-nav a[href="#spiaggia"]', "Beach"],
    ['.site-nav a[href="#servizi"]', "Services"],
    ['.site-nav a[href="#ristorante"]', "Restaurant"],
    ['.site-nav a[href="#eventi"]', "Events"],
    ['.site-nav a[href="#recensioni"]', "Reviews"],
    ['.site-nav a[href="#contatti"]', "Contacts"],
    [".hero .eyebrow", "Cavi di Lavagna | Gulf of Tigullio"],
    [".hero-copy", "The beach day you will want to repeat: a curated shoreline, sea-view restaurant, sunset cocktails and services designed for families, couples and groups."],
    [".hero-scroll", "Scroll"],
    [".beach-story .eyebrow", "Beach"],
    [".beach-story h2", "Seafront relaxation in Cavi di Lavagna"],
    [".beach-story > p:not(.eyebrow)", "Orderly umbrellas, blue sunbeds, open sea and a beach cared for every day: a place to enjoy the Ligurian Riviera from morning to sunset, with bar, restaurant, sports, wellness and online booking for your preferred spot."],
    [".beach-info-panel span", "Info & reservations"],
    [".service-band .section-heading .eyebrow", "Services"],
    [".service-band .section-heading h2", "Experiences designed to enjoy the sea beyond the umbrella."],
    [".service-band .section-heading p:not(.eyebrow)", "Wellness, movement and small sea-view rituals: choose the rhythm of your day and book the service that makes it yours."],
    [".service-card:nth-child(1) h3", "Sea-view hot tub"],
    [".service-card:nth-child(2) h3", "Massages and treatments"],
    [".service-card:nth-child(3) h3", "SUP and kayak"],
    [".service-card:nth-child(4) h3", "Yoga and pilates"],
    [".restaurant-feature-copy .eyebrow", "Restaurant"],
    [".restaurant-feature-copy h2", "Sea-view lunches and dinners under the stars."],
    [".restaurant-feature-copy > p:not(.eyebrow)", "The restaurant looks directly onto the sea: a bright dining room, carefully set tables and cuisine that celebrates seafood, Ligurian flavors and the quiet elegance of Riviera days."],
    [".restaurant-info-panel span", "Info & reservations"],
    [".restaurant-info-panel strong", "Seafront restaurant, Cavi di Lavagna"],
    [".restaurant-statement p", "From a light lunch after a swim to a slower sunset dinner, every table stays close to the rhythm of the sea."],
    [".events-copy .eyebrow", "Seafront events"],
    [".events-copy h2", "Your seafront event, beautifully handled."],
    [".events-copy p:not(.eyebrow)", "The venue is ideal for private moments and tailored evenings, with indoor spaces, a terrace and staff support to create the right format."],
    [".review-pill", "Reviews"],
    [".reviews-inner h2", "What our guests say"],
    [".review-card:nth-child(1) blockquote", "\"A very beautiful beach club, kind staff and an excellent sea-view restaurant.\""],
    [".review-card:nth-child(2) blockquote", "\"Always orderly, clean and renewed. A certainty in Cavi di Lavagna.\""],
    [".review-card:nth-child(3) blockquote", "\"Courtesy, cleanliness and good bar and restaurant service. The view does the rest.\""],
    [".review-swipe-hint", "Swipe to read the reviews"],
    [".review-note", "It only takes 10 seconds"],
    [".contact-pill", "Contacts"],
    [".contact-card h2", "Come visit us."],
    [".contact-card > .contact-item:nth-of-type(1) div > span", "Address"],
    [".contact-card > .contact-item:nth-of-type(2) div > span", "Phone"],
    [".contact-card > .contact-item:nth-of-type(3) div > span", "Email"],
    [".contact-card > .contact-item:nth-of-type(4) div > span", "Hours"],
    [".contact-hours strong", "Beach season 2026"],
    [".contact-hours p", "Open every day during the season. Restaurant and bar available by reservation for events and sea-view tables."],
    [".map-place-town", "Cavi di Lavagna"],
    [".map-place-road", "Via Aurelia"],
    [".map-place-sea", "Gulf of Tigullio"],
    [".map-label strong", "Cavi di Lavagna, seafront"],
    [".map-label span", "Via Aurelia snc"],
    [".map-open", "Open in Maps"],
    [".map-consent p", "Google Maps loads only with your consent. Your choice is remembered for 6 months."],
    ["[data-map-accept]", "Accept and view the map"],
    [".map-consent a", "Open directly in Google Maps"],
    [".footer-copy", "© 2026 Bagni Serenella · All rights reserved"],
    [".footer-legal-links a:nth-of-type(1)", "Privacy Policy"],
    [".footer-legal-links a:nth-of-type(2)", "Cookie Policy"],
    [".footer-legal-links a:nth-of-type(3)", "Legal notes"],
    ["#beach-modal .eyebrow", "Beach reservation"],
    ["#beach-modal-title", "Book your day at the beach"],
    ["#service-modal .eyebrow", "Experience booking"],
    ["#service-modal-title", "Book your experience"],
    ["#restaurant-modal .eyebrow", "Restaurant reservation"],
    ["#restaurant-modal-title", "Book your table"],
    ["#event-modal .eyebrow", "Event planning"],
    ["#event-modal-title", "Plan your seafront event"],
    [".contact-call", "Call now"],
  ].forEach(([selector, text]) => setFullText(selector, text));

  setAllFullText(".review-card figcaption strong", "Verified guest");
  setAllFullText(".review-card figcaption span", "Online review");
  document.querySelectorAll(".privacy-consent-copy").forEach((element) => {
    rememberHtml(element);
    element.innerHTML =
      'I confirm that I have read the privacy notice and understand that the request will be sent via WhatsApp only through my voluntary action. <a href="privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a>';
  });

  [
    [".hero-actions .button", "Choose your umbrella"],
    [".beach-info-panel .whatsapp-cta", "Book your beach day"],
    [".service-booking .button", "Book your experience"],
    [".restaurant-info-panel button", "Book table"],
    [".restaurant-menu-link", "View the menu"],
    [".events-copy .button", "Plan your event"],
    [".review-cta", "Leave a review on Google"],
    [".contact-actions .button-primary", "Book now"],
    [".mobile-cta-call", "Call"],
    [".mobile-cta-hero-book", "Choose your umbrella"],
  ].forEach(([selector, text]) => setInlineText(selector, text));

  [
    ["#beach-modal .booking-form > label:nth-of-type(1)", "Full name"],
    ["#beach-modal .booking-form > label:nth-of-type(2)", "Phone"],
    ["#beach-modal .form-row label:nth-child(1)", "Date"],
    ["#beach-modal .form-row label:nth-child(2)", "People"],
    ["#beach-modal .booking-form > label:nth-of-type(3)", "Preference"],
    ["#beach-modal .booking-form > label:nth-of-type(4)", "Notes"],
    ["#service-modal .booking-form > label:nth-of-type(1)", "Full name"],
    ["#service-modal .booking-form > label:nth-of-type(2)", "Phone"],
    ["#service-modal .form-row label:nth-child(1)", "Date"],
    ["#service-modal .form-row label:nth-child(2)", "People"],
    ["#service-modal .service-options legend", "Available services"],
    ["#service-modal .booking-form > label:nth-of-type(3)", "Preferred time"],
    ["#service-modal .booking-form > label:nth-of-type(4)", "Notes"],
    ["#restaurant-modal .booking-form > label:nth-of-type(1)", "Full name"],
    ["#restaurant-modal .booking-form > label:nth-of-type(2)", "Phone"],
    ["#restaurant-modal .form-row label:nth-child(1)", "Date"],
    ["#restaurant-modal .form-row label:nth-child(2)", "Time"],
    ["#restaurant-modal .booking-form > label:nth-of-type(3)", "People"],
    ["#restaurant-modal .booking-form > label:nth-of-type(4)", "Occasion"],
    ["#restaurant-modal .booking-form > label:nth-of-type(5)", "Notes"],
    ["#event-modal .booking-form > label:nth-of-type(1)", "Full name"],
    ["#event-modal .booking-form > label:nth-of-type(2)", "Phone"],
    ["#event-modal .form-row label:nth-child(1)", "Approximate date"],
    ["#event-modal .form-row label:nth-child(2)", "Guests"],
    ["#event-modal .booking-form > label:nth-of-type(3)", "Event type"],
    ["#event-modal .booking-form > label:nth-of-type(4)", "Preferred time"],
    ["#event-modal .booking-form > label:nth-of-type(5)", "Wishes and notes"],
  ].forEach(([selector, text]) => setInlineText(selector, text));

  setAllInlineText("#service-modal .service-options label span", [
    "Sea-view hot tub",
    "Massages and treatments",
    "SUP and kayak",
    "Yoga and pilates",
  ]);

  [
    ["#beach-modal select[name='interest'] option:nth-child(1)", "Select"],
    ["#beach-modal select[name='interest'] option:nth-child(2)", "Sunbeds"],
    ["#beach-modal select[name='interest'] option:nth-child(3)", "Umbrellas + Sunbeds"],
    ["#beach-modal select[name='interest'] option:nth-child(4)", "Umbrellas + Sunbeds + Cabins"],
    ["#restaurant-modal select[name='occasion'] option:nth-child(1)", "Lunch"],
    ["#restaurant-modal select[name='occasion'] option:nth-child(2)", "Dinner"],
    ["#restaurant-modal select[name='occasion'] option:nth-child(3)", "Aperitif"],
    ["#restaurant-modal select[name='occasion'] option:nth-child(4)", "Private event"],
    ["#event-modal select[name='occasion'] option:nth-child(1)", "Select"],
    ["#event-modal select[name='occasion'] option:nth-child(2)", "Birthday"],
    ["#event-modal select[name='occasion'] option:nth-child(3)", "Anniversary"],
    ["#event-modal select[name='occasion'] option:nth-child(4)", "Communion or baptism"],
    ["#event-modal select[name='occasion'] option:nth-child(5)", "Corporate party"],
    ["#event-modal select[name='occasion'] option:nth-child(6)", "Private dinner"],
    ["#event-modal select[name='occasion'] option:nth-child(7)", "Other event"],
  ].forEach(([selector, text]) => setFullText(selector, text));

  setAllFullText(".booking-form button[type='submit']", "Send request on WhatsApp");
  setAttribute("#service-modal input[name='time']", "placeholder", "Morning, afternoon or exact time");
  setAttribute("#event-modal input[name='time']", "placeholder", "Lunch, aperitif, dinner or preferred time");
  setAttribute("#event-modal textarea[name='notes']", "placeholder", "Tell us what you have in mind");
  setAttribute(".modal-close", "aria-label", "Close form");
  setAttribute(".beach-controls [data-carousel-prev]", "aria-label", "Previous image");
  setAttribute(".beach-controls [data-carousel-next]", "aria-label", "Next image");
  setAttribute(".restaurant-controls [data-carousel-prev]", "aria-label", "Previous image");
  setAttribute(".restaurant-controls [data-carousel-next]", "aria-label", "Next image");
  setAttribute(".event-controls [data-carousel-prev]", "aria-label", "Previous event");
  setAttribute(".event-controls [data-carousel-next]", "aria-label", "Next event");
}

function setLanguage(language, updateHash = true) {
  const nextLanguage = language === "en" ? "en" : "it";

  restoreItalianCopy();

  if (nextLanguage === "en") {
    applyEnglishCopy();
  }

  document.documentElement.lang = nextLanguage;

  languageLinks.forEach((link) => {
    const isActive = link.dataset.langSwitch === nextLanguage;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (updateHash && window.history?.replaceState) {
    window.history.replaceState(null, "", nextLanguage === "en" ? "#en" : "#it");
  }
}

languageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setLanguage(link.dataset.langSwitch);
  });
});

const initialLanguage =
  window.location.hash === "#en" || new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "it";
setLanguage(initialLanguage, false);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function scheduleIdleTask(callback, delay = 500) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 1600 });
    return;
  }

  window.setTimeout(callback, delay);
}

function collectImageUrls() {
  const urls = [];

  document.querySelectorAll("img[src]").forEach((image) => {
    urls.push(image.currentSrc || image.getAttribute("src"));
  });

  return [...new Set(urls.filter(Boolean).map((url) => new URL(url, document.baseURI).href))];
}

function preloadSiteImages() {
  const queue = collectImageUrls().filter((url) => !url.startsWith("data:"));
  const parallelLoads = mobileHeroQuery.matches ? 5 : 8;

  function preloadNext() {
    const url = queue.shift();

    if (!url) {
      return;
    }

    const image = new Image();
    image.decoding = "async";
    image.onload = image.onerror = preloadNext;
    image.src = url;
  }

  for (let count = 0; count < parallelLoads; count += 1) {
    preloadNext();
  }
}

function readMapConsent() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(mapConsentKey) || "null");
    return Boolean(stored?.accepted && Date.now() - stored.timestamp < mapConsentDuration);
  } catch (error) {
    return false;
  }
}

function storeMapConsent() {
  try {
    window.localStorage.setItem(mapConsentKey, JSON.stringify({ accepted: true, timestamp: Date.now() }));
  } catch (error) {
    // The map still loads for this session if storage is unavailable.
  }
}

function loadGoogleMap() {
  if (!mapIframe) {
    return;
  }

  const source = mapIframe.dataset.src;
  if (source && !mapIframe.getAttribute("src")) {
    mapIframe.setAttribute("src", source);
  }

  if (mapConsent) {
    mapConsent.hidden = true;
  }
}

if (readMapConsent()) {
  loadGoogleMap();
}

mapAccept?.addEventListener("click", () => {
  storeMapConsent();
  loadGoogleMap();
});

if (mapConsent && !readMapConsent()) {
  mapConsent.hidden = false;
}

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}

function syncMobileHeroCta() {
  if (!hero || !mobileCta) {
    return;
  }

  const heroBottom = hero.getBoundingClientRect().bottom;
  const shouldShowHeroCta = mobileHeroQuery.matches && heroBottom > window.innerHeight * 0.42;
  document.body.classList.toggle("hero-mobile-cta", shouldShowHeroCta);
}

function syncHero() {
  syncHeader();
  syncMobileHeroCta();

  if (!hero || reduceMotion.matches) {
    return;
  }

  const progress = clamp(window.scrollY / (window.innerHeight * 0.82), 0, 1);
  const eased = 1 - Math.pow(1 - progress, 3);

  root.style.setProperty("--hero-scale", (1 + eased * 0.09).toFixed(3));
  root.style.setProperty("--hero-shift", `${Math.round(eased * -42)}px`);
  root.style.setProperty("--hero-content-y", `${Math.round(eased * -54)}px`);
  root.style.setProperty("--hero-content-opacity", String(clamp(1 - progress * 1.45, 0, 1).toFixed(3)));
  root.style.setProperty("--hero-veil", String(clamp(progress * 1.22, 0, 1).toFixed(3)));
}

let ticking = false;

function requestSync() {
  if (ticking) {
    return;
  }

  ticking = true;
  window.requestAnimationFrame(() => {
    syncHero();
    ticking = false;
  });
}

syncHero();
preloadSiteImages();
window.addEventListener("scroll", requestSync, { passive: true });
window.addEventListener("resize", requestSync);

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  header?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navToggle?.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
});

function closeModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (!modal) {
    return;
  }

  modals.forEach(closeModal);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".booking-form input, .booking-form select, .booking-form textarea")?.focus();
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openModal(trigger.dataset.modalOpen));
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-modal-close")) {
      closeModal(modal);
    }
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modals.forEach((modal) => {
      if (!modal.hidden) {
        closeModal(modal);
      }
    });
  }
});

carousels.forEach((carousel) => {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const track = carousel.querySelector("[data-carousel-track]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const counter = carousel.querySelector("[data-carousel-counter]");
  const slides = [...carousel.querySelectorAll("[data-carousel-card]")];
  let activeIndex = 0;
  let scrollFrame = 0;

  function activeSlides() {
    return slides.filter((slide) => window.getComputedStyle(slide).display !== "none");
  }

  function visibleSlides() {
    const mobileCount = Number(carousel.dataset.visibleMobile || 1);
    const desktopCount = Number(carousel.dataset.visibleDesktop || 3);
    return window.matchMedia("(max-width: 720px)").matches ? mobileCount : desktopCount;
  }

  function slideWidth() {
    const currentSlides = activeSlides();

    if (!currentSlides[0]) {
      return 0;
    }

    const style = window.getComputedStyle(track || viewport);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    return currentSlides[0].getBoundingClientRect().width + gap;
  }

  function maxIndex() {
    return Math.max(activeSlides().length - visibleSlides(), 0);
  }

  function updateCounter() {
    if (counter) {
      counter.textContent = `${activeIndex + 1} / ${activeSlides().length}`;
    }
  }

  function loadSlideImages(fromIndex = activeIndex) {
    const currentSlides = activeSlides();
    const preloadWindow = Math.max(visibleSlides() + 2, 3);
    const preloadUntil = Math.min(fromIndex + preloadWindow, currentSlides.length);

    for (let index = fromIndex; index < preloadUntil; index += 1) {
      const image = currentSlides[index]?.querySelector("img");

      if (!image) {
        continue;
      }

      image.loading = "eager";
      image.decoding = "async";
    }
  }

  function normalizeIndex(index) {
    const limit = maxIndex();

    if (index < 0) {
      return limit;
    }

    if (index > limit) {
      return 0;
    }

    return index;
  }

  function syncFromScroll() {
    const width = slideWidth();

    if (!viewport || !width) {
      return;
    }

    activeIndex = clamp(Math.round(viewport.scrollLeft / width), 0, maxIndex());
    loadSlideImages();
    updateCounter();
  }

  function goTo(index) {
    if (!viewport || activeSlides().length === 0) {
      return;
    }

    activeIndex = normalizeIndex(index);
    loadSlideImages();
    viewport.scrollTo({ left: slideWidth() * activeIndex, behavior: "smooth" });
    updateCounter();
  }

  prevButton?.addEventListener("click", (event) => {
    goTo(activeIndex - 1);
    event.currentTarget.blur();
  });
  nextButton?.addEventListener("click", (event) => {
    goTo(activeIndex + 1);
    event.currentTarget.blur();
  });
  viewport?.addEventListener(
    "scroll",
    () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        syncFromScroll();
        scrollFrame = 0;
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", () => goTo(activeIndex));
  loadSlideImages(0);
  updateCounter();
});

function formValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function messageLines(kind, form, formData) {
  const common = [
    `Nome: ${formValue(formData, "name")}`,
    `Telefono: ${formValue(formData, "phone")}`,
    `Data: ${formValue(formData, "date")}`,
    `Persone: ${formValue(formData, "people")}`,
  ];

  if (kind === "spiaggia") {
    return [
      "Ciao Bagni Serenella, vorrei prenotare una giornata al mare.",
      ...common,
      `Preferenza: ${formValue(formData, "interest")}`,
      `Note: ${formValue(formData, "notes") || "-"}`,
    ];
  }

  if (kind === "servizi") {
    const services = formData.getAll("services").map(String).join(", ");

    return [
      "Ciao Bagni Serenella, vorrei prenotare una esperienza.",
      ...common,
      `Servizi: ${services}`,
      `Orario preferito: ${formValue(formData, "time") || "-"}`,
      `Note: ${formValue(formData, "notes") || "-"}`,
    ];
  }

  if (kind === "eventi") {
    return [
      "Ciao Bagni Serenella, vorrei organizzare un evento vista mare.",
      ...common,
      `Tipologia evento: ${formValue(formData, "occasion")}`,
      `Orario preferito: ${formValue(formData, "time") || "-"}`,
      `Desideri e note: ${formValue(formData, "notes") || "-"}`,
    ];
  }

  return [
    "Ciao Bagni Serenella, vorrei prenotare un tavolo al ristorante.",
    ...common,
    `Orario: ${formValue(formData, "time")}`,
    `Occasione: ${formValue(formData, "occasion") || "-"}`,
    `Note: ${formValue(formData, "notes") || "-"}`,
  ];
}

bookingForms.forEach((form) => {
  const requiredGroup = form.querySelector("[data-required-group]");

  requiredGroup?.addEventListener("change", () => {
    requiredGroup.querySelector("input")?.setCustomValidity("");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    if (requiredGroup) {
      const hasSelection = Boolean(requiredGroup.querySelector("input:checked"));
      const firstOption = requiredGroup.querySelector("input");
      firstOption?.setCustomValidity(hasSelection ? "" : "Seleziona almeno un servizio.");

      if (!hasSelection) {
        firstOption?.reportValidity();
        return;
      }
    }

    const formData = new FormData(form);
    const kind = form.dataset.bookingKind || "";
    const message = messageLines(kind, form, formData).join("\n");
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");

    const modal = form.closest("[data-modal]");
    if (modal) {
      closeModal(modal);
    }

    form.reset();
  });
});
