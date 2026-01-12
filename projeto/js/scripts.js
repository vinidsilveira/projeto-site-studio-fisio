// Seleção elementos
const menuBtn = document.querySelector("#menu");
const closeMenuBtn = document.querySelector("#close-menu");
const menu = document.querySelector("#mobile-navbar");

const desktopLinks = document.querySelectorAll("#navbar a");
const mobileLinks = document.querySelectorAll("#mobile-navbar a");
const allLinks = [...desktopLinks, ...mobileLinks];

const slides = document.querySelectorAll(".banner");
const dots = document.querySelectorAll(".dot");
let slidesIndex = 0;

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
      menu.classList.remove("menu-active");
    }
  }, 500);
}

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }

  slidesIndex++;

  if (slidesIndex > slides.length) {
    slidesIndex = 1;
  }

  slides[slidesIndex - 1].classList.add("active");
  dots[slidesIndex - 1].classList.add("active");

  setTimeout(showSlides, 5000);
}

// Eventos
[menuBtn, closeMenuBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    menu.classList.toggle("menu-active");
  });
});

allLinks.forEach((link) => {
  link.addEventListener("click", smoothScroll);
});

const ctaContact = document.querySelector("#cta-contact");

if (ctaContact) {
  ctaContact.addEventListener("click", smoothScroll);
}

// Inicialização
showSlides();

// Mensagem sucesso e-mail
// Mensagem sucesso e-mail
const form = document.querySelector("#contact-form");
const successMessage = document.querySelector("#form-success");

if (form && successMessage) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          successMessage.style.display = "block";
          form.reset();

          // esconder após alguns segundos
          setTimeout(() => {
            successMessage.style.display = "none";
          }, 5000);
        } else {
          alert("Erro ao enviar mensagem. Tente novamente.");
        }
      })
      .catch(() => {
        alert("Erro de conexão. Tente novamente mais tarde.");
      });
  });
}
