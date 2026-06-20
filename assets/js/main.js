"use strict";
document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    initPreloader();
    initStickyHeader();
    initScrollTopButton();
    initMobileNavigation();
    initMobileDropdowns();
    initVendorPlugins();
    initAnnouncementBannerOffset();
    initCounters();
});
function initPreloader() {
    const preloader = document.querySelector("#preloader");
    if (!preloader) {
        return;
    }
    window.addEventListener("load", () => {
        preloader.remove();
    });
}
function initStickyHeader() {
    const header = document.querySelector("#header");
    if (!header) {
        return;
    }
    document.addEventListener("scroll", () => {
        header.classList.toggle("sticked", window.scrollY > 100);
    });
}
function initScrollTopButton() {
    const scrollTop = document.querySelector(".scroll-top");
    if (!scrollTop) {
        return;
    }
    const toggleScrollTop = () => {
        scrollTop.classList.toggle("active", window.scrollY > 100);
    };
    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
    scrollTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}
function initMobileNavigation() {
    const mobileNavShow = document.querySelector(".mobile-nav-show");
    const mobileNavHide = document.querySelector(".mobile-nav-hide");
    const mobileNavToggle = () => {
        document.body.classList.toggle("mobile-nav-active");
        mobileNavShow?.classList.toggle("d-none");
        mobileNavHide?.classList.toggle("d-none");
    };
    document.querySelectorAll(".mobile-nav-toggle").forEach((toggle) => {
        toggle.addEventListener("click", (event) => {
            event.preventDefault();
            mobileNavToggle();
        });
    });
    document.querySelectorAll("#navbar a").forEach((navbarLink) => {
        if (!navbarLink.hash || !document.querySelector(navbarLink.hash)) {
            return;
        }
        navbarLink.addEventListener("click", () => {
            if (document.querySelector(".mobile-nav-active")) {
                mobileNavToggle();
            }
        });
    });
}
function initMobileDropdowns() {
    document.querySelectorAll(".navbar .dropdown > a").forEach((dropdownLink) => {
        dropdownLink.addEventListener("click", (event) => {
            if (!document.querySelector(".mobile-nav-active")) {
                return;
            }
            event.preventDefault();
            dropdownLink.classList.toggle("active");
            dropdownLink.nextElementSibling?.classList.toggle("dropdown-active");
            const indicator = dropdownLink.querySelector(".dropdown-indicator");
            indicator?.classList.toggle("bi-chevron-up");
            indicator?.classList.toggle("bi-chevron-down");
        });
    });
}
function initVendorPlugins() {
    new PureCounter();
    GLightbox({
        selector: ".glightbox",
    });
    new Swiper(".slides-1", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    window.addEventListener("load", () => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
            mirror: false,
            offset: 50,
            delay: 0,
        });
    });
}
function initAnnouncementBannerOffset() {
    const adjustHeaderPosition = () => {
        const banner = document.querySelector(".announcement-banner");
        const header = document.querySelector("#header");
        if (!banner || !header) {
            return;
        }
        header.style.top = `${banner.offsetHeight}px`;
    };
    window.addEventListener("load", adjustHeaderPosition);
    window.addEventListener("resize", adjustHeaderPosition);
}
function initCounters() {
    const counters = document.querySelectorAll(".count");
    const durationMs = 3000;
    const tickMs = 10;
    counters.forEach((counter) => {
        const target = Number(counter.getAttribute("data-target") ?? 0);
        const increment = target / (durationMs / tickMs);
        let currentCount = 0;
        const updateCount = () => {
            currentCount += increment;
            if (currentCount < target) {
                counter.innerText = String(Math.ceil(currentCount));
                window.setTimeout(updateCount, tickMs);
                return;
            }
            counter.innerText = String(target);
        };
        updateCount();
    });
}
