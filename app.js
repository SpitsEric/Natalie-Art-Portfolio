const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

// portfolio modal
const portfolioItems = document.querySelectorAll(".portfolio-item");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

function PageTransitions() {
  //Button click active class
  for (let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener("click", function () {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].className = currentBtn[0].className.replace(
        " active-btn",
        ""
      );
      this.className += " active-btn";
    });
  }

  //Section active class
  allSections.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      //remove selected from othe buttons
      sectBtns.forEach((btn) => {
        btn.classList.remove("active");
      });

      e.target.classList.add("active");

      //hide other sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}

function PortfolioModal() {
  // Function to open a modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "flex";
    }
  }

  // Function to close a modal
  function closeModal(modal) {
    modal.style.display = "none";
  }

  // Add click event listeners to portfolio items
  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => {
      const modalId = item.dataset.modal;
      const modal = document.getElementById(modalId);
      const img = modal.querySelector("img");
      openModal(modalId);
      adjustModalSize(modal, img); // Call adjustModalSize here
    });
  });

  // Add click event listeners to close buttons
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target == modal) {
        closeModal(modal);
      }
    });
  });

  // Function to adjust modal content size based on image aspect ratio
  function adjustModalSize(modal, img) {
    if (img && img.naturalWidth && img.naturalHeight) {
      const modalContent = modal.querySelector(".modal-content");
      const modalText = modal.querySelector(".modal-text");
      let imgWidth = img.naturalWidth;
      let imgHeight = img.naturalHeight;
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;

      // Constrain image dimensions to fit within window
      if (imgWidth > maxWidth) {
        imgHeight = (maxWidth / imgWidth) * imgHeight;
        imgWidth = maxWidth;
      }
      if (imgHeight > maxHeight) {
        imgWidth = (maxHeight / imgHeight) * imgWidth;
        imgHeight = maxHeight;
      }

      // Set image dimensions
      img.style.width = `${imgWidth}px`;
      img.style.height = `${imgHeight}px`;

      // Calculate combined width and set modal content width
      const textWidth = modalText.clientWidth;
      let combinedWidth = imgWidth + textWidth;

      // Constrain combined width to window width
      combinedWidth = Math.min(combinedWidth, maxWidth);

      modalContent.style.width = `${combinedWidth}px`;
      modalContent.style.height = `${imgHeight}px`;

      // Center the modal content
      modalContent.style.left = `50%`;
      modalContent.style.top = `50%`;
      modalContent.style.transform = `translate(-50%, -50%)`;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  PageTransitions();
  PortfolioModal();

  modals.forEach((modal) => {
    modal.style.display = "none";
  });
});
