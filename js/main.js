/* META MİMARLIK — main.js */
(function () {
  "use strict";

  /* ---------- Header: kaydırınca gölge ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobil menü ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  navToggle.addEventListener("click", function () {
    var open = siteNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      siteNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Reveal animasyonu ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- İstatistik sayaçları ---------- */
  var counters = document.querySelectorAll(".stat-num");
  function animateCounter(el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.count; });
  }

  /* ---------- Proje filtreleme ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.dataset.filter;
      projectCards.forEach(function (card) {
        var show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Aktif menü bağlantısı ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- İletişim formu ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;

    form.querySelectorAll("[required]").forEach(function (field) {
      var ok = field.value.trim() !== "";
      if (ok && field.type === "email") {
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      }
      field.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      status.textContent = "Lütfen zorunlu alanları doğru şekilde doldurun.";
      status.className = "form-status err";
      return;
    }

    /* Not: Bu statik bir sitedir; form verisi bir sunucuya gönderilmez.
       Gerçek kullanım için form action'ı bir backend'e veya
       Formspree benzeri bir servise bağlanmalıdır. */
    status.textContent = "Teşekkürler! Mesajınız alındı, en kısa sürede dönüş yapacağız.";
    status.className = "form-status ok";
    form.reset();
  });

  form.addEventListener("input", function (e) {
    if (e.target.classList.contains("is-invalid") && e.target.value.trim() !== "") {
      e.target.classList.remove("is-invalid");
    }
  });

  /* ---------- Footer yılı ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
