"use strict";

/* HEADER */

const header = document.getElementById("header");

function updateHeader() {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader);
updateHeader();


/* MOBILE MENU */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        document.body.classList.toggle("menu-open");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
}


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry, index) => {

            if (!entry.isIntersecting) return;

            setTimeout(() => {
                entry.target.classList.add("visible");
            }, index * 60);

            observer.unobserve(entry.target);
        });

    },
    {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* FAQ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer = otherItem.querySelector(".faq-answer");

            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }
        });

        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});


/* SMOOTH SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight = header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            15;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    });
});


/* YEAR */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* HERO PARALLAX */

const heroPreview = document.querySelector(".hero-preview");

if (heroPreview && window.matchMedia("(min-width: 801px)").matches) {

    window.addEventListener("mousemove", event => {

        const x = (window.innerWidth / 2 - event.clientX) / 100;
        const y = (window.innerHeight / 2 - event.clientY) / 100;

        heroPreview.style.transform =
            `translate3d(${x * 0.35}px, ${y * 0.35}px, 0)`;
    });
}


/* BUTTON MICRO INTERACTION */

document.querySelectorAll(".btn, .price-button").forEach(button => {

    button.addEventListener("mouseenter", () => {
        button.style.willChange = "transform";
    });

    button.addEventListener("mouseleave", () => {
        button.style.willChange = "auto";
    });
});


/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".desktop-nav a");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.desktop-nav a[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        });

    },
    {
        threshold: 0.25
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});