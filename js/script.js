document.addEventListener("DOMContentLoaded", () => {
    // Image Slider Functionality
    const images = [
        "images/gallery/sample1.jpg",
        "images/gallery/sample2.jpg",
        "images/gallery/sample3.jpg"
    ];
    let currentImageIndex = 0;

    const sliderImage = document.getElementById("slider-image");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    function updateImage() {
        sliderImage.src = images[currentImageIndex];
    }

    prevButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    }, 5000); // Change image every 5 seconds

    // Mobile Menu Toggle
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.getElementById("nav-links");

    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Form Validation
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    form.addEventListener("submit", (event) => {
        let valid = true;

        if (nameInput.value.trim() === "") {
            valid = false;
            alert("Name is required.");
        }

        if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
            valid = false;
            alert("Please enter a valid email address.");
        }

        if (messageInput.value.trim() === "") {
            valid = false;
            alert("Message is required.");
        }

        if (!valid) {
            event.preventDefault(); // Prevent form from submitting if not valid
        }
    });
});
