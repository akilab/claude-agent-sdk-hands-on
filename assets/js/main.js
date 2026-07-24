const filterButtons = document.querySelectorAll("[data-filter]");
const lessonCards = document.querySelectorAll("[data-category]");
const categoryLinks = document.querySelectorAll("[data-filter-link]");

function setActiveFilter(filter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  lessonCards.forEach((card) => {
    const shouldShow = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-hidden", !shouldShow);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

categoryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveFilter(link.dataset.filterLink);
  });
});
