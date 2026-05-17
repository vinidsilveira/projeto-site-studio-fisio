// Seleção elementos
const menuBtn = document.querySelector("#menu");
const closeMenuBtn = document.querySelector("#close-menu");
const menu = document.querySelector("#mobile-navbar");

function setMenuState(open) {
  menu.classList.toggle("menu-active", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

const desktopLinks = document.querySelectorAll("#navbar a");
const mobileLinks = document.querySelectorAll("#mobile-navbar a");
const allLinks = [...desktopLinks, ...mobileLinks];

const slides = document.querySelectorAll(".banner");
const dots = document.querySelectorAll(".dot");
let slidesIndex = 1;
let slideTimer = null;

// Funções
function smoothScroll(e) {
  e.preventDefault();

  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });

  setTimeout(() => {
    if (menu.classList.contains("menu-active")) {
      setMenuState(false);
    }
  }, 500);
}

function goToSlide(index) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  slidesIndex = ((index - 1 + slides.length) % slides.length) + 1;
  slides[slidesIndex - 1].classList.add("active");
  dots[slidesIndex - 1].classList.add("active");
}

function startAutoSlide() {
  if (slideTimer) clearTimeout(slideTimer);
  slideTimer = setTimeout(() => {
    goToSlide(slidesIndex >= slides.length ? 1 : slidesIndex + 1);
    startAutoSlide();
  }, 5000);
}

// Eventos
menuBtn.addEventListener("click", () => {
  const isOpen = menu.classList.contains("menu-active");
  setMenuState(!isOpen);
});

closeMenuBtn.addEventListener("click", () => {
  setMenuState(false);
});

allLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});

const ctaContact = document.querySelector("#cta-contact");
if (ctaContact) {
  ctaContact.addEventListener("click", smoothScroll);
}

// Dots clicáveis
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index + 1);
    startAutoSlide();
  });
});

// Inicialização carousel
goToSlide(1);
startAutoSlide();

// Contato via WhatsApp
const WHATSAPP_NUMBER = "5551997458815";

const form = document.querySelector("#contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = (form.querySelector("#name")?.value || "").trim();
    const phone = (form.querySelector("#phone")?.value || "").trim();
    const message = (form.querySelector("#message")?.value || "").trim();

    const lines = ["Olá! Vim pelo site e gostaria de agendar uma avaliação."];
    if (name) lines.push(`*Nome:* ${name}`);
    if (phone) lines.push(`*Telefone:* ${phone}`);
    if (message) lines.push(`*Mensagem:* ${message}`);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );

    form.reset();
  });
}

// Scroll reveal via Intersection Observer
const revealEls = document.querySelectorAll("[data-reveal]");

if (revealEls.length > 0) {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("revealed"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }
}
