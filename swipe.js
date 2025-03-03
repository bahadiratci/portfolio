// Variables for swipe detection
let startX = 0; // Track the start position of swipe horizontally
let endX = 0;   // Track the end position of swipe horizontally
let startY = 0; // Track the start position of swipe vertically
let endY = 0;   // Track the end position of swipe vertically
let isZooming = false; // Flag to detect zooming

// Function to handle swipe
function handleSwipe() {
    if (isZooming) return; // Skip swipe handling if zooming

    const swipeThreshold = 50; // Minimum horizontal swipe distance
    const verticalSwipeThreshold = 50; // Minimum vertical swipe distance

    // Horizontal swipe logic
    if (startX - endX > swipeThreshold) {
        // Swipe left, go to next image
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    } else if (endX - startX > swipeThreshold) {
        // Swipe right, go to previous image
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    }

    // Vertical swipe logic
    if (Math.abs(startY - endY) > verticalSwipeThreshold) {
        // Swipe up or down, close the modal
        modal.style.display = "none"; // Close the modal
    }
}

// Add touch event listeners for swipe and zoom detection
modal.addEventListener("touchstart", (event) => {
    if (event.touches.length > 1) {
        isZooming = true; // User is zooming
        return;
    }

    isZooming = false; // Reset zoom flag if only one touch point
    startX = event.touches[0].clientX; // Capture the starting X position of the swipe
    startY = event.touches[0].clientY; // Capture the starting Y position of the swipe
});

modal.addEventListener("touchend", (event) => {
    if (isZooming) {
        isZooming = false; // Reset zoom flag when touch ends
        return;
    }

    endX = event.changedTouches[0].clientX; // Capture the ending X position of the swipe
    endY = event.changedTouches[0].clientY; // Capture the ending Y position of the swipe
    handleSwipe(); // Determine swipe direction and act accordingly
});

