document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       MOBILE MENU
       ========================================== */

    const menuButton = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {

            navLinks.classList.toggle("open");

            const isOpen =
                navLinks.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

        });

        /* Close menu when link is clicked */

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* ==========================================
       SCROLL REVEAL
       ========================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -30px 0px"
                }
            );

        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* ==========================================
       WHATSAPP
       ========================================== */

    const whatsappNumber = "27750981170";


    function openWhatsApp(message) {

        const url =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* ==========================================
       COVER ENQUIRY BUTTONS
       ========================================== */

    document
        .querySelectorAll(".wa-enquire")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const cover =
                        this.dataset.cover ||
                        "Funeral Cover";

                    const details =
                        this.dataset.details ||
                        "";

                    const message =
`Hello KFG Funeral Services 👋

I would like to enquire about:

*${cover}*

${details}

Please assist me with:
• Eligibility
• Monthly premium
• Cover amount
• Waiting period
• Benefits
• How to apply

Thank you.`;

                    openWhatsApp(message);

                }
            );

        });


    /* ==========================================
       WHATSAPP NAV BUTTON
       ========================================== */

    document
        .querySelectorAll(".nav-wa")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const message =
`Hello KFG Funeral Services 👋

I would like to enquire about your funeral cover and services.

Please assist me with more information.

Thank you.`;

                    /*
                     * We allow the normal link to work,
                     * so no preventDefault is needed.
                     */

                }
            );

        });


    /* ==========================================
       SMOOTH SCROLL
       ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* ==========================================
       HEADER SCROLL
       ========================================== */

    const header =
        document.querySelector(".site-header");

    if (header) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 30) {

                    header.classList.add(
                        "scrolled"
                    );

                } else {

                    header.classList.remove(
                        "scrolled"
                    );

                }

            }
        );

    }


    /* ==========================================
       PREVENT IMAGE DRAGGING
       ========================================== */

    document
        .querySelectorAll("img")
        .forEach(function (image) {

            image.setAttribute(
                "draggable",
                "false"
            );

        });


    /* ==========================================
       CURRENT YEAR
       ========================================== */

    document
        .querySelectorAll(".current-year")
        .forEach(function (element) {

            element.textContent =
                new Date().getFullYear();

        });


    /* ==========================================
       DEBUG MESSAGE
       ========================================== */

    console.log(
        "KFG Funeral Services website loaded successfully."
    );

});
