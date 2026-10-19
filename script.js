"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const billingButtons = document.querySelectorAll("[data-billing]");
  const priceElements = document.querySelectorAll(".price");
  const monthlyDetails = document.querySelectorAll("[data-monthly-text]");
  const yearlyDetails = document.querySelectorAll("[data-yearly-text]");
  const chooseButtons = document.querySelectorAll("[data-plan]");
  const selectionMessage = document.getElementById("selectionMessage");

  let currentBilling = "monthly";

  // Update displayed prices and billing information.
  function updateBilling(billing) {
    currentBilling = billing;

    billingButtons.forEach((button) => {
      const isActive = button.dataset.billing === billing;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    priceElements.forEach((priceElement) => {
      priceElement.classList.add("price-changing");

      const newPrice = priceElement.dataset[billing];

      if (newPrice !== undefined) {
        priceElement.textContent = newPrice;
      }

      // Briefly animate the updated price.
      window.setTimeout(() => {
        priceElement.classList.remove("price-changing");
      }, 150);
    });

    monthlyDetails.forEach((detail) => {
      detail.hidden = billing !== "monthly";
    });

    yearlyDetails.forEach((detail) => {
      detail.hidden = billing !== "yearly";
    });

    // Clear an old selection message when billing changes.
    selectionMessage.textContent = "";
  }

  // Attach a click event to both billing options.
  billingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateBilling(button.dataset.billing);
    });
  });

  // Show the selected plan and its billing price.
  chooseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const planName = button.dataset.plan;
      const planCard = button.closest(".pricing-card");
      const priceElement = planCard.querySelector(".price");
      const price = priceElement.textContent;

      const billingLabel =
        currentBilling === "yearly" ? "per month, billed annually" : "per month, billed monthly";

      selectionMessage.textContent =
        `You selected the ${planName} plan at $${price} ${billingLabel}. This is a demo; no payment has been made.`;

      selectionMessage.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    });
  });

  // Start with monthly billing selected.
  updateBilling("monthly");
});