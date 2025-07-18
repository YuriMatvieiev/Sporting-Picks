document.addEventListener("DOMContentLoaded", function () {
  // --- Dropdowns ---
  const dropdowns = document.querySelectorAll(
    ".full-picks__header .full-picks__dropdown"
  );
  if (dropdowns.length) {
    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".full-picks__dropdown-button");
      const menu = dropdown.querySelector(".full-picks__dropdown-menu");
      if (button && menu) {
        button.addEventListener("click", function (e) {
          e.stopPropagation();
          dropdowns.forEach((d) => {
            if (d !== dropdown) d.classList.remove("open");
          });
          dropdown.classList.toggle("open");
        });
        menu.querySelectorAll(".full-picks__dropdown-item").forEach((item) => {
          item.addEventListener("click", function () {
            button.childNodes[0].nodeValue = this.textContent + " ";
            dropdown.classList.remove("open");
          });
        });
      }
    });
    document.addEventListener("click", function () {
      dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
    });
  }

  // --- Search (mobile) ---
  const searchForm = document.querySelector(".header__search");
  const searchInput = document.querySelector(".header__search-input");
  const searchIcon = document.querySelector(".header__search-icon");
  if (searchForm && searchInput && searchIcon && window.innerWidth < 768) {
    searchIcon.addEventListener("click", function (e) {
      e.preventDefault();
      searchForm.classList.add("active");
      searchInput.style.display = "block";
      searchInput.focus();
    });
    document.addEventListener("click", function (e) {
      if (
        searchForm.classList.contains("active") &&
        !searchForm.contains(e.target)
      ) {
        searchForm.classList.remove("active");
        searchInput.style.display = "none";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchForm.classList.contains("active")) {
        searchForm.classList.remove("active");
        searchInput.style.display = "none";
      }
    });
  }

  // --- Scroll to top button ---
  const scrollBtn = document.querySelector(".scroll-top");
  if (scrollBtn) {
    let lastScroll = 0;
    let ticking = false;

    function updateScrollBtn() {
      if (window.innerWidth > 1280) {
        scrollBtn.classList.add("active");
      } else {
        handleScroll();
      }
    }

    function handleScroll() {
      if (window.innerWidth > 1280) {
        scrollBtn.classList.add("active");
        return;
      }
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 200 && currentScroll < lastScroll) {
        scrollBtn.classList.add("active");
      } else {
        scrollBtn.classList.remove("active");
      }
      lastScroll = currentScroll;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    });
    window.addEventListener("resize", updateScrollBtn);
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    updateScrollBtn();
  }

  // --- Mobile filter panel ---
  const filterBtn = document.querySelector(".full-picks__filter-mobile-btn");
  const filterPanel = document.querySelector(".full-picks__filter-mobile");
  const filterOverlay = document.querySelector(
    ".full-picks__filter-mobile-overlay"
  );
  const filterClose = document.querySelector(
    ".full-picks__filter-mobile-close"
  );
  if (filterBtn && filterPanel && filterOverlay && filterClose) {
    filterBtn.addEventListener("click", function () {
      filterPanel.classList.add("active");
      filterOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
    filterClose.addEventListener("click", function () {
      filterPanel.classList.remove("active");
      filterOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
    filterOverlay.addEventListener("click", function () {
      filterPanel.classList.remove("active");
      filterOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // --- Vote section ---
  const voteBtn = document.querySelector(".vote-section__button");
  if (voteBtn) {
    voteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const checked = document.querySelector(".vote-option__input:checked");
      if (!checked) {
        return;
      }
      document.querySelector(".vote-stats").style.display = "flex";
      this.style.display = "none";
      document
        .querySelectorAll(".vote-option__input")
        .forEach((input) => (input.disabled = true));
    });
  }
});
