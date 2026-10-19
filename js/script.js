/*
  SEO & Digital Marketing website interactions.
  IMPORTANT: Replace the email and WhatsApp number below before publishing.
*/
const BUSINESS_EMAIL = "hello@example.com"; // Replace with your real business email.
const WHATSAPP_NUMBER = "923000000000";       // Country code + number, digits only (no + or spaces).

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const whatsappLink = document.getElementById("whatsappLink");

  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation: open/close and close after a link is selected.
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Mark the current section in the navigation as the visitor scrolls.
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  // Update the WhatsApp destination from the single setting at the top of this file.
  if (whatsappLink && WHATSAPP_NUMBER && !WHATSAPP_NUMBER.includes("0000000000")) {
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  }

  // Front-end validation, then prepare an email in the visitor's email application.
  // For direct delivery without opening an email app, connect a secure form backend.
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subject = encodeURIComponent(`Website enquiry: ${service}`);
      const body = encodeURIComponent(
        `Hello,\n\nI'd like to request a consultation.\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nGoals:\n${message}\n`
      );

      if (!BUSINESS_EMAIL || BUSINESS_EMAIL === "hello@example.com") {
        formStatus.textContent = "Demo mode: please replace BUSINESS_EMAIL in js/script.js with your real email address before using this form.";
        formStatus.classList.add("status-warning");
        return;
      }

      formStatus.textContent = "Your email app should open with your message prepared. Please review and send it there.";
      formStatus.classList.remove("status-warning");
      window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
    });
  }
});
