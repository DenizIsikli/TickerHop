let targetPrice = null;
let direction = null;
let alerted = false;

function parseNordnetNumber(text) {
    const value = parseFloat(
        text
            .replace(/[^\d,.-]/g, "")
            .replace(/\./g, "")
            .replace(",", "."),
    );
    return Number.isNaN(value) ? null : value;
}

function getNordnetPrice() {
    const priceSpan = [...document.querySelectorAll("span.font-extrabold.typography-title2")].find((span) =>
        span.checkVisibility(),
    );
    return priceSpan ? parseNordnetNumber(priceSpan.textContent) : null;
}

function createPriceAlertField() {
    const container = document.createElement("div");
    container.className = "price-alert-container";

    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.01";
    input.placeholder = "Set price alert";
    input.className = "price-alert-input";

    input.addEventListener("input", () => {
        const value = parseFloat(input.value);
        targetPrice = Number.isNaN(value) ? null : value;
        const current = getNordnetPrice();
        direction = current !== null && targetPrice > current ? "up" : "down";
        alerted = false;
        updatePriceAlert();
    });

    const status = document.createElement("span");
    status.className = "price-alert-status";

    container.append(input, status);
    return container;
}

function updatePriceAlert() {
    const status = document.querySelector(".price-alert-status");
    if (!status) return;

    const current = getNordnetPrice();
    status.textContent = current !== null ? `Current: ${current}` : "Current: N/A";

    if (targetPrice === null || current === null || alerted) return;

    const reached = direction === "up" ? current >= targetPrice : current <= targetPrice;
    if (reached) {
        const symbol = document.querySelector(".ticker-hop-container")?.dataset.symbol;
        const ticker = symbol ? symbol.split(":").pop() : "Unknown";

        alerted = true;
        status.textContent += " · target reached!";
        browser.runtime.sendMessage({
            type: "price-alert",
            message: `${ticker}\nTarget ${targetPrice}\nReached (current: ${current})`,
        });
    }
}

const priceAlert = {
    create() {
        targetPrice = null;
        direction = null;
        alerted = false;
        return [createPriceAlertField()];
    },
    update: updatePriceAlert,
};
