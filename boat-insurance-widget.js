
class BoatInsuranceForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const dealer = this.getAttribute("dealer") || "unknown";
    const theme = this.getAttribute("theme") || "light";
    const primaryColor = this.getAttribute("primary-color") || "#00adef";

    const container = document.createElement("div");
    container.id = "boat-insurance-container";
    container.style.cssText = \`
      font-family: 'Montserrat', sans-serif;
      border-radius: 8px;
      overflow: hidden;
    \`;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://insurance.toyloan.com/wp-content/plugins/legend-insurance-api/css/lbapi.css";

    // Inject a loader in case API takes time
    const loading = document.createElement("div");
    loading.textContent = "Loading quote tool...";
    loading.style.padding = "20px";
    loading.style.textAlign = "center";
    loading.style.color = primaryColor;

    this.shadowRoot.appendChild(link);
    this.shadowRoot.appendChild(container);
    container.appendChild(loading);

    // Load the existing form and script
    const script = document.createElement("script");
    script.src = "https://insurance.toyloan.com/wp-content/plugins/legend-insurance-api/js/lbapi.js";
    script.onload = () => {
      fetch("https://insurance.toyloan.com/wp-admin/admin-ajax.php?action=render_quote_form")
        .then(res => res.text())
        .then(html => {
          container.innerHTML = html;

          // Inject tracking field
          const dealerInput = document.createElement("input");
          dealerInput.type = "hidden";
          dealerInput.name = "dealer";
          dealerInput.value = dealer;

          const form = container.querySelector("form");
          if (form) form.appendChild(dealerInput);

          // Fire tracking event
          if (window.dataLayer) {
            dataLayer.push({ event: "quoteWidgetLoaded", dealer });
          }

        }).catch(err => {
          container.innerHTML = "<p>Failed to load quote form. Please try again later.</p>";
        });
    };
    document.head.appendChild(script);
  }
}

customElements.define("boat-insurance-form", BoatInsuranceForm);
