// Modal functionality

const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const images = document.querySelectorAll(".project-img");
let currentIndex = 0;

// Show the modal with clicked image

images.forEach(function(image, index) {
    image.addEventListener("click", function() {
        modal.style.display = "flex";  // Show modal
        modalImg.src = image.src;     // Set the image source
        captionText.innerHTML = image.alt;  // Set the caption
        currentIndex = index;         // Set the current image index
    });
});


// Close the modal when clicking on the close button

document.querySelector(".close").addEventListener("click", function() {
    modal.style.display = "none";  // Hide modal
});

// Close modal when 'Esc' key is pressed

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";  // Close modal on Escape key
    }
});

// Navigate through images using Arrow keys

document.addEventListener("keydown", function(event) {
    if (modal.style.display === "flex") { // Allow navigation only when modal is open
        if (event.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % images.length; // Next image
            modalImg.src = images[currentIndex].src;
            captionText.innerHTML = images[currentIndex].alt;
        } else if (event.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + images.length) % images.length; // Previous image
            modalImg.src = images[currentIndex].src;
            captionText.innerHTML = images[currentIndex].alt;
        }
    }
});


// Function to close modal on clicking outside the image

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

 

// Sidebar functions

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = "flex";
};

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = "none";
};

// Smooth scrolling animation effect

document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.classList.add("in-view");
        } else {
            section.classList.remove("in-view");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projectImages = document.querySelectorAll(".project-img");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Trigger fade-in
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    });

    projectImages.forEach(image => observer.observe(image));
});