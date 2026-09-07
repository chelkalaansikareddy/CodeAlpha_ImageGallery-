document.addEventListener("DOMContentLoaded", () => {

    const cards = Array.from(document.querySelectorAll(".card"));
    const buttons = document.querySelectorAll(".filter-btn");
    const searchBox = document.getElementById("searchBox");
    const noResults = document.getElementById("noResults");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxCategory = document.getElementById("lightboxCategory");

    const closeBtn = document.getElementById("closeBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentFilter = "all";
    let currentIndex = 0;
    let visibleCards = cards;

    // FILTER FUNCTION
    function filterGallery() {
        const searchText = searchBox.value.toLowerCase().trim();

        visibleCards = cards.filter(card => {

            const category = card.dataset.category;
            const title = card.dataset.title.toLowerCase();

            const categoryMatch =
                currentFilter === "all" ||
                category === currentFilter;

            const searchMatch =
                title.includes(searchText) ||
                category.includes(searchText);

            return categoryMatch && searchMatch;
        });

        cards.forEach(card => {
            if (visibleCards.includes(card)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        noResults.style.display =
            visibleCards.length === 0 ? "block" : "none";
    }

    // CATEGORY BUTTONS
    buttons.forEach(button => {
        button.addEventListener("click", () => {

            buttons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            currentFilter = button.dataset.filter;

            filterGallery();
        });
    });

    // SEARCH
    searchBox.addEventListener("input", filterGallery);

    // OPEN LIGHTBOX
    function openLightbox(index) {

        if (visibleCards.length === 0) return;

        currentIndex = index;

        const card = visibleCards[currentIndex];
        const image = card.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent =
            card.querySelector("h3").textContent;

        lightboxCategory.textContent =
            card.querySelector("p").textContent;

        lightbox.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    // CARD CLICK
    cards.forEach(card => {
        card.addEventListener("click", () => {

            const index = visibleCards.indexOf(card);

            if (index !== -1) {
                openLightbox(index);
            }
        });
    });

    // CLOSE
    function closeLightbox() {
        lightbox.classList.remove("show");
        document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeLightbox);

    // NEXT
    nextBtn.addEventListener("click", () => {

        if (visibleCards.length === 0) return;

        currentIndex =
            (currentIndex + 1) % visibleCards.length;

        openLightbox(currentIndex);
    });

    // PREVIOUS
    prevBtn.addEventListener("click", () => {

        if (visibleCards.length === 0) return;

        currentIndex =
            (currentIndex - 1 + visibleCards.length)
            % visibleCards.length;

        openLightbox(currentIndex);
    });

    // CLICK OUTSIDE IMAGE
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // KEYBOARD CONTROLS
    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("show")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }
    });

    // INITIAL LOAD
    filterGallery();
});