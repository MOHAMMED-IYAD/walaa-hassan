// ── NAV SCROLL ──
const nav = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ── REVEAL ──
const revealEls = document.querySelectorAll(".reveal, .reveal-left");
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.12 },
);
revealEls.forEach((el) => io.observe(el));

// ── PAIN LIST STAGGER ──
const painItems = document.querySelectorAll(".pain-list li");
const painObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                painItems.forEach((li, i) => {
                    setTimeout(() => li.classList.add("visible"), i * 100);
                });
            }
        });
    },
    { threshold: 0.3 },
);
if (painItems.length) painObs.observe(painItems[0].closest("ul"));

// ── COUNTERS ──
function animCounter(el, target) {
    let count = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = "+" + count;
        if (count >= target) clearInterval(interval);
    }, 30);
}
const counterObs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.querySelectorAll(".num[data-target]").forEach((el) => {
                    animCounter(el, parseInt(el.dataset.target));
                });
                counterObs.unobserve(e.target);
            }
        });
    },
    { threshold: 0.3 },
);
document
    .querySelectorAll(".pain-counter")
    .forEach((el) => counterObs.observe(el));

// ── FORM SUBMIT ──
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector("input[type=text]").value;
    const phone = this.querySelector("input[type=tel]").value;
    const msg = encodeURIComponent(
        `مرحبا ولاء،\nاسمي: ${name}\n\nأريد أحجز استشارة 🙏`,
    );
    const pref = this.querySelector("input[name=contact_pref]:checked")?.value;
    if (pref === "whatsapp" || !pref) {
        window.open(`https://wa.me/966500000000?text=${msg}`, "_blank");
    }
    document.getElementById("formSuccess").classList.add("show");
    this.reset();
});

// ── LANG TOGGLE ──
// ─────────────────────────────
// LANGUAGE SYSTEM (AR / EN)
// ─────────────────────────────

let currentLang = localStorage.getItem("lang") || "ar";

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);
});

function toggleLang() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
}
function applyLanguage(lang) {
    const isAr = lang === "ar";

    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar]").forEach((el) => {
        const arText = el.dataset.ar;
        const enText = el.dataset.en;

        if (!arText || !enText) return;

        // إذا النص يحتوي HTML مثل <br> أو <em>
        if (arText.includes("<") || enText.includes("<")) {
            el.innerHTML = isAr ? arText : enText;
        } else {
            el.textContent = isAr ? arText : enText;
        }
    });

    document.title = isAr
        ? "ولاء حسان | خبيرة البراند الشخصي"
        : "Walaa Hassan | Personal Branding Expert";

    const btn = document.querySelector(".lang-switch");
    if (btn) btn.textContent = isAr ? "EN" : "AR";

    document.body.classList.toggle("lang-ar", isAr);
    document.body.classList.toggle("lang-en", !isAr);
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});
// ── Mobile Nav Hamburger ──
const hamburger = document.querySelector('.nav-hamburger');
const drawer    = document.querySelector('.nav-drawer');
const drawerLinks = document.querySelectorAll('.nav-drawer a');

if (hamburger && drawer) {

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        drawer.classList.toggle('open');
        document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });

    // أغلق الـ drawer عند الضغط على أي رابط
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // أغلق عند الضغط خارج الـ drawer
    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) {
            hamburger.classList.remove('open');
            drawer.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ── Navbar scroll effect ──
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
});