
/* =========================================
   SHERIFF SON BUSINESS CENTER
   Complete Website JavaScript
========================================= */


/* 1. MOBILE NAVIGATION MENU */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const isExpanded = navMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isExpanded);

        menuToggle.setAttribute(
            "aria-label",
            isExpanded
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });

}


/* 2. CLOSE MOBILE MENU AFTER CLICKING A LINK */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });

});


/* 3. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE */

document.addEventListener("click", function (event) {

    if (!menuToggle || !navMenu) {
        return;
    }

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedToggle &&
        navMenu.classList.contains("active")
    ) {

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});


/* 4. DISPLAY CURRENT YEAR IN FOOTER */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* 5. WHATSAPP BUSINESS ENQUIRY FORM */

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        // Prevent the form from refreshing the website.
        event.preventDefault();

        // Check required fields.
        if (!enquiryForm.reportValidity()) {
            return;
        }

        // Collect form information.
        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const product =
            document.getElementById("product").value;

        const enquiryType =
            document.getElementById("enquiryType").value;

        const quantity =
            document.getElementById("quantity").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // Validate email format if an email was entered.
        if (email) {

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                return;

            }

        }


        // Create the WhatsApp enquiry message.
        const whatsappMessage =
`Hello Sheriff Son's Business Center,

I would like to make a business enquiry.

Full Name: ${fullName}

Email Address: ${email || "Not provided"}

Product of Interest: ${product}

Enquiry Type: ${enquiryType}

Required Quantity: ${quantity || "Not specified"}

Message:
${message}

I look forward to your response.

Thank you.`;


        // Business WhatsApp number.
        const phoneNumber = "231886276291";


        // Encode the message for a WhatsApp URL.
        const encodedMessage = encodeURIComponent(whatsappMessage);


        // Create the WhatsApp link.
        const whatsappURL =
            `https://wa.me/${phoneNumber}?text=${encodedMessage}`;


        // Open WhatsApp in a new browser tab.
        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


/* 6. INTERACTIVE PRODUCT IMAGE LIGHTBOX */

const productButtons = document.querySelectorAll(
    ".product-image-button"
);

if (productButtons.length > 0) {

    // Create the lightbox container.
    const lightbox = document.createElement("div");

    lightbox.className = "image-lightbox";

    lightbox.setAttribute("role", "dialog");

    lightbox.setAttribute("aria-modal", "true");

    lightbox.setAttribute(
        "aria-label",
        "Enlarged product photograph"
    );

    lightbox.innerHTML = `
        <button
            class="lightbox-close"
            type="button"
            aria-label="Close enlarged photograph">
            &times;
        </button>

        <img src="" alt="">
    `;

    document.body.appendChild(lightbox);


    // Get the lightbox elements.
    const lightboxImage = lightbox.querySelector("img");

    const closeButton = lightbox.querySelector(".lightbox-close");


    // Remember the button that opened the lightbox.
    let previousFocus = null;


    // Open the product photograph.
    function openLightbox(image, button) {

        if (!image) {
            return;
        }

        previousFocus = button;

        lightboxImage.src = image.src;

        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.classList.add("lightbox-open");

        closeButton.focus();

    }


    // Close the product photograph.
    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";

        if (previousFocus) {
            previousFocus.focus();
        }

    }


    // Add click events to product photographs.
    productButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const image = button.querySelector("img");

            openLightbox(image, button);

        });

    });


    // Close button.
    closeButton.addEventListener("click", closeLightbox);


    // Close when clicking outside the photograph.
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // Close when pressing Escape.
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });

}


/* 7. FAQ ACCORDION */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

    item.addEventListener("toggle", function () {

        // Do nothing when the FAQ item is closed.
        if (!item.open) {
            return;
        }

        // Close the other FAQ items.
        faqItems.forEach(function (otherItem) {

            if (otherItem !== item) {

                otherItem.open = false;

            }

        });

    });

});


/* 8. SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-image, " +
    ".about-content, " +
    ".product-card, " +
    ".testimonial-card, " +
    ".value-card, " +
    ".team-card, " +
    ".contact-card, " +
    ".faq-item"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    // Fallback for browsers without IntersectionObserver.
    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


/* 9. WHATSAPP BUTTON ACCESSIBILITY */

const whatsappButton = document.querySelector(".whatsapp-float");

if (whatsappButton) {

    whatsappButton.setAttribute(
        "aria-label",
        "Contact Sheriff Son Business Center on WhatsApp"
    );

}


/* 10. PREVENT EMPTY FORM SUBMISSION */

if (enquiryForm) {

    enquiryForm.addEventListener("input", function () {

        enquiryForm.classList.remove("form-error");

    });

}
