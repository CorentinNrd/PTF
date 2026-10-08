import "./style.css";

document.body.classList.add("has-js");

const menuButton = document.querySelector("[data-menu-toggle]");
const primaryNavigation = document.querySelector("#navigation-principale");

if (
  menuButton instanceof HTMLButtonElement &&
  primaryNavigation instanceof HTMLElement
) {
  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Fermer le menu" : "Ouvrir le menu",
    );
    primaryNavigation.classList.toggle("is-open", isOpen);
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  window
    .matchMedia("(min-width: 48.01rem)")
    .addEventListener("change", (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    });
}

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

const projectCards = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const projectObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -24px 0px",
    },
  );

  projectCards.forEach((projectCard) => projectObserver.observe(projectCard));
} else {
  projectCards.forEach((projectCard) =>
    projectCard.classList.add("is-visible"),
  );
}
