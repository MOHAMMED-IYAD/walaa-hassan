window.addEventListener("DOMContentLoaded", function () {

    // ── NAV SCROLL ──
    const nav = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
    });

    // ── REVEAL ──
    const revealEls = document.querySelectorAll(".reveal, .reveal-left");
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));

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

    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.querySelectorAll(".num[data-target]").forEach((el) => {
                    animCounter(el, parseInt(el.dataset.target));
                });
                counterObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(".pain-counter").forEach(el => counterObs.observe(el));


    // ── FORM ──
    document.getElementById("contactForm")?.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = this.querySelector("input[type=text]")?.value || "";
        const phone = this.querySelector("input[type=tel]")?.value || "";
        const email = this.querySelector("input[type=email]")?.value || "";

        const msg =
            `مرحبا ولاء
اسمي: ${name}
رقمي: ${phone}
إيميلي: ${email}

أريد أحجز استشارة 🙏`;

        const pref = this.querySelector("input[name=contact_pref]:checked")?.value;

        const whatsappLink = `https://wa.me/00972592663938?text=${encodeURIComponent(msg)}`;

        const mailLink =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=wala.hassan1994@gmail.com" +
            "&su=" + encodeURIComponent("طلب استشارة") +
            "&body=" + encodeURIComponent(msg);

        if (pref === "whatsapp") window.open(whatsappLink, "_blank");
        else if (pref === "email") window.open(mailLink, "_blank");
        else if (pref === "call") window.location.href = "tel:+972592663938";
        else alert("اختار طريقة التواصل أولاً");

        document.getElementById("formSuccess")?.classList.add("show");
        this.reset();
    });


    // ── LANGUAGE SYSTEM ──
    let currentLang = localStorage.getItem("lang") || "ar";
    let swiper;

    function applyLanguage(lang) {

        const isAr = lang === "ar";

        document.documentElement.lang = lang;
        document.documentElement.dir = isAr ? "rtl" : "ltr";

        // ── TEXT CHANGE ──
        document.querySelectorAll("[data-ar][data-en]").forEach(el => {
            el.innerHTML = isAr ? el.dataset.ar : el.dataset.en;
        });

        // ── PLACEHOLDER FIX ──
        document.querySelectorAll("[data-ar-placeholder]").forEach(el => {
            el.placeholder = isAr
                ? el.getAttribute("data-ar-placeholder")
                : el.getAttribute("data-en-placeholder");
        });

        // ── TITLE ──
        document.title = isAr
            ? "ولاء حسان | خبيرة البراند الشخصي"
            : "Walaa Hassan | Personal Branding Expert";

        // ── BUTTON ──
        const btn = document.querySelector(".lang-switch");
        if (btn) btn.textContent = isAr ? "EN" : "AR";

        document.body.classList.toggle("lang-ar", isAr);
        document.body.classList.toggle("lang-en", !isAr);

        initSwiper();
    }

    document.querySelector(".lang-switch")?.addEventListener("click", () => {
        currentLang = currentLang === "ar" ? "en" : "ar";
        localStorage.setItem("lang", currentLang);
        applyLanguage(currentLang);
    });

    applyLanguage(currentLang);


    // ── SWIPER ──
    function initSwiper() {

        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }

        setTimeout(() => {
            swiper = new Swiper(".testimonialsSwiper", {
                slidesPerView: 3,
                spaceBetween: 20,
                loop: true,
                centeredSlides: true,
                grabCursor: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                speed: 800,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 }
                }
            });
        }, 100);
    }


    // ── SMOOTH SCROLL ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", (e) => {
            const target = document.querySelector(a.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    // ── MOBILE MENU ──
    const navToggle = document.getElementById("nav-toggle");
    const drawer = document.querySelector(".nav-drawer");
    const drawerLinks = document.querySelectorAll(".nav-drawer a");

    drawerLinks.forEach(link => {
        link.addEventListener("click", () => {
            navToggle.checked = false;
        });
    });

    drawer.addEventListener("click", (e) => {
        if (e.target === drawer) {
            navToggle.checked = false;
        }
    });
    // ── PAIN LIST REVEAL ──
    const painItems = document.querySelectorAll("#pain .pain-list li");

    const painObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                painObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    painItems.forEach(li => painObs.observe(li));

});