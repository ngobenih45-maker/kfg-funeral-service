/* =========================================================
   KFG FUNERAL SERVICES
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const expanded =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute("aria-expanded", !expanded);
        });

        // Close mobile menu after clicking a link
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".site-header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .fade-up, .service-card, .cover-card, .about-content, .gallery-item"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       WHATSAPP SETTINGS
       ===================================================== */

    const whatsappNumber = "27750981170";


    /* =====================================================
       WHATSAPP FUNCTION
       ===================================================== */

    function openWhatsApp(message) {

        const encodedMessage = encodeURIComponent(message);

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    }


    /* =====================================================
       COVER ENQUIRIES
       ===================================================== */

    const enquiryButtons = document.querySelectorAll(
        ".whatsapp-enquiry, .cover-enquiry, [data-whatsapp]"
    );

    enquiryButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const cover =
                this.dataset.cover ||
                this.dataset.whatsapp ||
                this.closest(".cover-card")?.dataset.cover ||
                this.closest(".pricing-card")?.dataset.cover ||
                "Funeral Cover";

            const details =
                this.dataset.details ||
                this.closest(".cover-card")?.dataset.details ||
                "";

            const message = `
Hello KFG Funeral Services 👋

I would like to enquire about the following funeral cover:

*${cover}*

${details}

Please provide me with more information about:
• Eligibility
• Monthly premium
• Cover amount
• Waiting period
• Benefits
• How to join

Thank you.
            `.trim();

            openWhatsApp(message);

        });

    });


    /* =====================================================
       GENERAL WHATSAPP BUTTONS
       ===================================================== */

    const generalWhatsAppButtons =
        document.querySelectorAll(
            ".general-whatsapp, .whatsapp-btn"
        );

    generalWhatsAppButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const message =
                this.dataset.message ||
                `Hello KFG Funeral Services 👋

I would like to enquire about your funeral services.

Please assist me with more information.

Thank you.`;

            openWhatsApp(message);

        });

    });


    /* =====================================================
       COVER CARD DATA
       ===================================================== */

    const coverCards = document.querySelectorAll(
        ".cover-card"
    );

    coverCards.forEach(card => {

        // Add a small interactive tilt effect on desktop
        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 768) return;

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "";

        });

    });


    /* =====================================================
       PRICING BUTTONS
       ===================================================== */

    document.querySelectorAll(
        "[data-cover-name]"
    ).forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const coverName =
                this.dataset.coverName;

            const premium =
                this.dataset.premium || "";

            const amount =
                this.dataset.amount || "";

            const message =
                `Hello KFG Funeral Services 👋

I am interested in the *${coverName}*.

Cover amount: ${amount}
Monthly premium: ${premium}

Please help me with the application process and eligibility requirements.

Thank you.`;

            openWhatsApp(message);

        });

    });


    /* =====================================================
       GALLERY LIGHTBOX
       ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img, .gallery-image"
        );

    let lightbox = document.querySelector(
        ".lightbox"
    );

    // Create lightbox if it doesn't exist
    if (!lightbox && galleryImages.length > 0) {

        lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close"
                    aria-label="Close image">
                &times;
            </button>

            <img class="lightbox-image"
                 src=""
                 alt="KFG Funeral Services">

            <button class="lightbox-prev"
                    aria-label="Previous image">
                &#10094;
            </button>

            <button class="lightbox-next"
                    aria-label="Next image">
                &#10095;
            </button>
        `;

        document.body.appendChild(lightbox);

    }


    if (lightbox && galleryImages.length > 0) {

        const lightboxImage =
            lightbox.querySelector(".lightbox-image");

        const closeButton =
            lightbox.querySelector(".lightbox-close");

        const previousButton =
            lightbox.querySelector(".lightbox-prev");

        const nextButton =
            lightbox.querySelector(".lightbox-next");

        let currentImage = 0;

        function showImage(index) {

            if (index < 0) {
                index = galleryImages.length - 1;
            }

            if (index >= galleryImages.length) {
                index = 0;
            }

            currentImage = index;

            lightboxImage.src =
                galleryImages[currentImage].src;

            lightboxImage.alt =
                galleryImages[currentImage].alt ||
                "KFG Funeral Services";

        }


        galleryImages.forEach((image, index) => {

            image.style.cursor = "pointer";

            image.addEventListener("click", () => {

                currentImage = index;

                showImage(currentImage);

                lightbox.classList.add("active");

                document.body.classList.add(
                    "lightbox-open"
                );

            });

        });


        closeButton?.addEventListener("click", closeLightbox);

        function closeLightbox() {

            lightbox.classList.remove("active");

            document.body.classList.remove(
                "lightbox-open"
            );

        }


        previousButton?.addEventListener(
            "click",
            () => showImage(currentImage - 1)
        );

        nextButton?.addEventListener(
            "click",
            () => showImage(currentImage + 1)
        );


        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });


        document.addEventListener("keydown", event => {

            if (!lightbox.classList.contains("active")) {
                return;
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showImage(currentImage - 1);
            }

            if (event.key === "ArrowRight") {
                showImage(currentImage + 1);
            }

        });

    }


    /* =====================================================
       GALLERY FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            "[data-gallery-filter]"
        );

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.galleryFilter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            galleryItems.forEach(item => {

                const category =
                    item.dataset.category;

                if (
                    filter === "all" ||
                    filter === category
                ) {

                    item.style.display = "";

                    setTimeout(() => {
                        item.classList.add("visible");
                    }, 50);

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    document.querySelectorAll(
        ".current-year"
    ).forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document.querySelectorAll(
        ".nav-menu a"
    ).forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       COUNTER ANIMATION
       ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (
        counters.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const counter =
                            entry.target;

                        const target =
                            parseInt(
                                counter.dataset.counter,
                                10
                            );

                        let current = 0;

                        const duration = 1500;

                        const increment =
                            target / (duration / 16);

                        function updateCounter() {

                            current += increment;

                            if (current >= target) {

                                counter.textContent =
                                    target.toLocaleString();

                                return;

                            }

                            counter.textContent =
                                Math.floor(current)
                                    .toLocaleString();

                            requestAnimationFrame(
                                updateCounter
                            );

                        }

                        updateCounter();

                        counterObserver.unobserve(
                            counter
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       PHONE NUMBER CLICK TRACKING
       ===================================================== */

    document.querySelectorAll(
        'a[href^="tel:"]'
    ).forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                "KFG Funeral Services phone enquiry:",
                link.href
            );

        });

    });


    /* =====================================================
       WHATSAPP FLOATING BUTTON
       ===================================================== */

    const floatingWhatsApp =
        document.querySelector(
            ".floating-whatsapp"
        );

    if (floatingWhatsApp) {

        floatingWhatsApp.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openWhatsApp(
                    `Hello KFG Funeral Services 👋

I would like to enquire about your funeral services.

Please assist me with more information.

Thank you.`
                );

            }
        );

    }


    /* =====================================================
       PRELOADER
       ===================================================== */

    const preloader =
        document.querySelector(
            ".preloader"
        );

    if (preloader) {

        window.addEventListener(
            "load",
            () => {

                preloader.classList.add(
                    "loaded"
                );

                setTimeout(() => {

                    preloader.remove();

                }, 700);

            }
        );

    }


    /* =====================================================
       DISABLE IMAGE DRAGGING
       ===================================================== */

    document.querySelectorAll("img")
        .forEach(img => {

            img.setAttribute(
                "draggable",
                "false"
            );

        });


    /* =====================================================
       CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%c KFG FUNERAL SERVICES ",
        "background:#0b1d3a;color:#d4a62a;font-size:18px;font-weight:bold;padding:8px;"
    );

    console.log(
        "%c You have a friend in us. ",
        "color:#d4a62a;font-size:14px;"
    );

});
