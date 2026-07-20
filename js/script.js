document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-icon");
    const navList = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll("header nav a");

    if (menuButton && navList) {
        const setMenuOpen = (open) => {
            navList.classList.toggle("active", open);
            menuButton.setAttribute("aria-expanded", String(open));
            menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
        };

        menuButton.addEventListener("click", () => {
            setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
        });

        navLinks.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
    }

    if (window.Swiper) {
        new Swiper(".gallery-swiper", {
            loop: true,
            preventClicks: false,
            preventClicksPropagation: false,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            slidesPerView: 1,
            spaceBetween: 12,
            breakpoints: {
                640: { slidesPerView: 2 },
                900: { slidesPerView: 3 }
            }
        });
    }

    const galleryLinks = Array.from(document.querySelectorAll('[data-lightbox="gallery"]'));
    if (galleryLinks.length) {
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Gallery image viewer");
        lightbox.hidden = true;
        lightbox.innerHTML = `
            <button class="lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
            <button class="lightbox-previous" type="button" aria-label="Previous image">&#10094;</button>
            <figure class="lightbox-figure">
                <img class="lightbox-image" alt="">
                <figcaption class="lightbox-caption" aria-live="polite"></figcaption>
            </figure>
            <button class="lightbox-next" type="button" aria-label="Next image">&#10095;</button>`;
        document.body.appendChild(lightbox);

        const image = lightbox.querySelector(".lightbox-image");
        const caption = lightbox.querySelector(".lightbox-caption");
        const closeButton = lightbox.querySelector(".lightbox-close");
        const previousButton = lightbox.querySelector(".lightbox-previous");
        const nextButton = lightbox.querySelector(".lightbox-next");
        let currentIndex = 0;
        let touchStartX = 0;

        const showImage = (index) => {
            currentIndex = (index + galleryLinks.length) % galleryLinks.length;
            const link = galleryLinks[currentIndex];
            const thumbnail = link.querySelector("img");
            image.src = link.href;
            image.alt = thumbnail?.alt || "Karol's Decor staging project";
            caption.textContent = `${currentIndex + 1} of ${galleryLinks.length}`;
        };

        const openLightbox = (index) => {
            showImage(index);
            lightbox.hidden = false;
            document.body.classList.add("lightbox-open");
            closeButton.focus();
        };

        const closeLightbox = () => {
            lightbox.hidden = true;
            document.body.classList.remove("lightbox-open");
            galleryLinks[currentIndex].focus();
        };

        const activateGalleryLink = (event) => {
            const link = event.target.closest('[data-lightbox="gallery"]');
            if (!link) return false;
            event.preventDefault();
            const index = galleryLinks.findIndex((item) => item.href === link.href);
            openLightbox(index >= 0 ? index : 0);
            return true;
        };

        document.addEventListener("click", (event) => {
            if (!lightbox.hidden) {
                const link = event.target.closest('[data-lightbox="gallery"]');
                if (link) event.preventDefault();
                return;
            }
            activateGalleryLink(event);
        }, true);

        closeButton.addEventListener("click", closeLightbox);
        previousButton.addEventListener("click", () => showImage(currentIndex - 1));
        nextButton.addEventListener("click", () => showImage(currentIndex + 1));
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) closeLightbox();
        });
        lightbox.addEventListener("touchstart", (event) => {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });
        lightbox.addEventListener("touchend", (event) => {
            const distance = event.changedTouches[0].screenX - touchStartX;
            if (Math.abs(distance) > 50) showImage(currentIndex + (distance < 0 ? 1 : -1));
        }, { passive: true });
        document.addEventListener("keydown", (event) => {
            if (lightbox.hidden) return;
            if (event.key === "Escape") closeLightbox();
            if (event.key === "ArrowLeft") showImage(currentIndex - 1);
            if (event.key === "ArrowRight") showImage(currentIndex + 1);
        });
    }

    const quoteForm = document.getElementById("quote-form");
    if (quoteForm) {
        quoteForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = new FormData(quoteForm);
            const value = (name) => String(data.get(name) || "Not provided").trim();
            const subject = `Staging quote request from ${value("name")} in ${value("city")}`;
            const body = [
                "Hello Karol,",
                "",
                "I would like to request a home staging quote.",
                "",
                `Name: ${value("name")}`,
                `Email: ${value("email")}`,
                `Phone: ${value("phone")}`,
                `City / town: ${value("city")}`,
                `Service: ${value("service")}`,
                `Target listing date: ${value("listingDate")}`,
                "",
                "Property details:",
                value("message")
            ].join("\n");
            window.location.href = `mailto:karolsdecor@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    const year = document.getElementById("current-year");
    if (year) year.textContent = new Date().getFullYear();
});
