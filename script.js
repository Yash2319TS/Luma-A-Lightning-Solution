const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".site-nav a, .nav-cta");
const swatches = document.querySelectorAll(".swatch");
const lampStatus = document.querySelector("#lampStatus");
const pricingToggles = document.querySelectorAll(".pricing-toggle");
const price = document.querySelector("#price");
const priceMeta = document.querySelector("#priceMeta");
const signupForm = document.querySelector(".signup-form");
const emailInput = document.querySelector("#email");
const formMessage = document.querySelector("#formMessage");

const finishes = {
  sage: {
    accent: "#6e8f72",
    deep: "#385541",
    soft: "#dfe9d5",
    status: "Sage glow selected"
  },
  coral: {
    accent: "#dc7767",
    deep: "#7a3e35",
    soft: "#f8ddd8",
    status: "Coral warmth selected"
  },
  ink: {
    accent: "#263238",
    deep: "#11191c",
    soft: "#d9e0df",
    status: "Ink focus selected"
  }
};

const plans = {
  monthly: {
    price: "$18",
    meta: "per month for 12 months"
  },
  annual: {
    price: "$189",
    meta: "one payment, launch bundle included"
  }
};

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

menuButton.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((item) => {
  item.addEventListener("click", (event) => {
    const selector = item.dataset.scrollTarget || item.getAttribute("href");
    if (selector && selector.startsWith("#")) {
      event.preventDefault();
      scrollToTarget(selector);
    }
    header.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

swatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const finish = finishes[swatch.dataset.color];

    document.documentElement.style.setProperty("--accent", finish.accent);
    document.documentElement.style.setProperty("--accent-deep", finish.deep);
    document.documentElement.style.setProperty("--accent-soft", finish.soft);
    lampStatus.textContent = finish.status;

    swatches.forEach((item) => item.classList.remove("active"));
    swatch.classList.add("active");
  });
});

pricingToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const plan = plans[toggle.dataset.plan];

    price.textContent = plan.price;
    priceMeta.textContent = plan.meta;

    pricingToggles.forEach((item) => item.classList.remove("active"));
    toggle.classList.add("active");
  });
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    formMessage.textContent = "Enter a valid email address.";
    formMessage.classList.remove("success");
    emailInput.focus();
    return;
  }

  formMessage.textContent = "You are on the Luma launch list.";
  formMessage.classList.add("success");
  signupForm.reset();
});