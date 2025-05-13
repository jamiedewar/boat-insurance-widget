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
      border: 2px solid \${primaryColor};
      padding: 20px;
      background: \${theme === "dark" ? "#222" : "#f9f9f9"};
      color: \${theme === "dark" ? "#fff" : "#000"};
    \`;

    container.innerHTML = \`
      <h2>Mock Boat Insurance Quote Form</h2>
      <p>Dealer: \${dealer}</p>
      <p>This is a mock version of the form for testing.</p>
      <form>
        <label>Boat Value: <input type="number" placeholder="Enter value" /></label><br/><br/>
        <label>Postal Code: <input type="text" placeholder="Enter postal code" /></label><br/><br/>
        <button type="submit">Get Quote</button>
      </form>
    \`;

    this.shadowRoot.appendChild(container);
  }
}

customElements.define("boat-insurance-form", BoatInsuranceForm);
