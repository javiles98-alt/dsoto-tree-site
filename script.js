// ========== REVIEW ROTATION ==========
const groups = document.querySelectorAll(".review-group");
const carousel = document.querySelector(".review-carousel");
let current = 0;
let intervalId;

function cycleReviews() {
  groups[current].classList.remove("active");
  current = (current + 1) % groups.length;
  groups[current].classList.add("active");
}

function startRotation() {
  intervalId = setInterval(cycleReviews, 5000);
}

function stopRotation() {
  clearInterval(intervalId);
}

// Start rotation
startRotation();

// Pause on hover
carousel.addEventListener("mouseenter", stopRotation);
carousel.addEventListener("mouseleave", startRotation);

// MOBILE NAV TOGGLE
const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  // AUTO-CLOSE MENU ON LINK CLICK
  const navLinks = mobileMenu.querySelectorAll("a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
  });

  // SCROLL TO TOP BUTTON
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
  });

 // ========== FORMSPREE AJAX SUBMIT ==========
 const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const endpoint = "https://formspree.io/f/xovdaele";

  // Disable the button + show "Sending..."
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  formStatus.textContent = "⏳ Sending...";
  formStatus.classList.remove("error");
  formStatus.style.color = "#999";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      formStatus.textContent = "✅ Message sent! We'll get back to you soon.";
      formStatus.style.color = "var(--success-green)";
      submitBtn.textContent = "✅ Sent!";
      form.reset();

      // Optional: re-enable after a short delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }, 3000); // 3 seconds
    } else {
      throw new Error("Formspree response not OK");
    }
  } catch (error) {
    formStatus.textContent = "❌ Something went wrong. Please try again.";
    formStatus.classList.add("error");
    formStatus.style.color = "var(--error-red)";
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});

submitBtn.disabled = true;
submitBtn.textContent = "Sending...";

// SCROLL TRIGGERED ANIMATION
const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Night Mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

 

