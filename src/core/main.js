const FEATURES = [tickerLinks, priceAlert];

function checkPage() {
    const existing = document.querySelector(".ticker-hop-container");
    const found = findSymbol();

    if (!found) {
        existing?.remove();
        return;
    }
    if (existing?.dataset.symbol === found.tvSymbol && existing.previousElementSibling === found.tickerNav) return;
    existing?.remove();

    const container = document.createElement("div");
    container.className = "ticker-hop-container";
    container.dataset.symbol = found.tvSymbol;

    for (const feature of FEATURES) {
        container.append(...feature.create(found));
    }

    found.tickerNav.after(container);
}

function updateFeatures() {
    for (const feature of FEATURES) {
        feature.update?.();
    }
}

let scheduled = false;

function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
        scheduled = false;
        checkPage();
        updateFeatures();
    });
}

new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
window.addEventListener("resize", schedule);

checkPage();
