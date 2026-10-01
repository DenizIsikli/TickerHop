const EXCHANGES = {
    xcse: "OMXCOP",
    xsto: "OMXSTO",
    xhel: "OMXHEX",
    xosl: "OSL",
};

function findSymbol() {
    const parts = location.pathname.split("/").filter(Boolean);
    const slug = parts.at(-1) ?? "";
    const exchange = EXCHANGES[slug.split("-").pop()];
    if (!exchange) return null;

    const tickerNav = [...document.querySelectorAll("nav.flex.h-4.items-center")].find((nav) => nav.checkVisibility());
    const tickerText = tickerNav?.querySelector("span:last-child")?.textContent.trim();
    if (!tickerText || !slug.includes(tickerText.toLowerCase().replace(/\s+/g, "-"))) return null;

    return { symbol: `${exchange}:${tickerText.replace(/\s+/g, "_")}`, tickerNav };
}

function checkPage() {
    const existing = document.querySelector(".ticker-hop");
    const found = findSymbol();

    if (!found) {
        existing?.remove();
        return;
    }
    if (existing?.dataset.symbol === found.symbol && existing.previousElementSibling === found.tickerNav) return;
    existing?.remove();

    const link = document.createElement("a");
    link.className = "ticker-hop";
    link.dataset.symbol = found.symbol;
    link.href = `https://www.tradingview.com/chart/?symbol=${found.symbol}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${found.symbol} ↗`;

    found.tickerNav.after(link);
}

function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
        scheduled = false;
        checkPage();
    });
}

let scheduled = false;

new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
window.addEventListener("resize", schedule);

checkPage();
