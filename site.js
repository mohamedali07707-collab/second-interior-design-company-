document.addEventListener("DOMContentLoaded", () => {
    // إظهار أقسام الصفحة تدريجيًا عند دخولها إلى مجال الرؤية.
    const animatedElements = document.querySelectorAll(
        ".hero-content, .intro > *, .work-item, .service-row, " +
        ".contact-band-content, .subhero > *, .service-note > *, " +
        ".about-hero > *, .manifesto-content > *, .values-list > *, " +
        ".contact-page-heading, .contact-layout > *"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, activeObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    activeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        animatedElements.forEach((element, index) => {
            element.classList.add("reveal");
            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 80}ms`
            );
            observer.observe(element);
        });
    }

    // يوضح للزائر أي صفحة يقرأ الآن، اعتمادًا على اسم الملف.
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a, .topbar-contact").forEach((link) => {
        const linkedPage = new URL(link.href).pathname.split("/").pop();

        if (linkedPage === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    // يحدّث سنة حقوق النشر في التذييل تلقائيًا.
    const footerYear = document.querySelector(".footer > span");

    if (footerYear) {
        footerYear.textContent = `© ${new Date().getFullYear()}`;
    }
});