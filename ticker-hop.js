const EXCHANGES = {
    // Nordics
    xcse: { tv: "OMXCOP", yahoo: ".CO" }, // Nasdaq Copenhagen
    xsto: { tv: "OMXSTO", yahoo: ".ST" }, // Nasdaq Stockholm
    xhel: { tv: "OMXHEX", yahoo: ".HE" }, // Nasdaq Helsinki
    xosl: { tv: "OSL", yahoo: ".OL" }, // Oslo Børs

    // US
    xnas: { tv: "NASDAQ", yahoo: "" },
    xnys: { tv: "NYSE", yahoo: "" },
    xase: { tv: "AMEX", yahoo: "" }, // NYSE American

    // Europe & Canada
    xlon: { tv: "LSE", yahoo: ".L" }, // London
    xetr: { tv: "XETR", yahoo: ".DE" }, // Xetra
    xfra: { tv: "FWB", yahoo: ".F" }, // Frankfurt
    xber: { tv: "BER", yahoo: ".BE" }, // Berlin
    xtse: { tv: "TSX", yahoo: ".TO" }, // Toronto
};

function findSymbol() {
    const parts = location.pathname.split("/").filter(Boolean);
    const slug = parts.at(-1) ?? "";
    const exchange = EXCHANGES[slug.split("-").pop()];
    if (!exchange) return null;

    const tickerNav = [...document.querySelectorAll("nav.flex.h-4.items-center")].find((nav) => nav.checkVisibility());
    const tickerText = tickerNav?.querySelector("span:last-child")?.textContent.trim();
    if (!tickerText || !slug.includes(tickerText.toLowerCase().replace(/\s+/g, "-"))) return null;

    return {
        exchange,
        tvSymbol: `${exchange.tv}:${tickerText.replace(/\s+/g, "_")}`,
        yahooSymbol: `${tickerText.replace(/[\s.]+/g, "-")}${exchange.yahoo}`,
        tickerNav,
    };
}

function createLink(href, text, iconPath) {
    const link = document.createElement("a");
    link.className = "ticker-hop";
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = text;

    const icon = document.createElement("img");
    icon.src = browser.runtime.getURL(iconPath);
    icon.alt = "";
    icon.className = "ticker-hop-icon";
    link.prepend(icon);

    return link;
}

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
    container.append(
        createLink(
            `https://www.tradingview.com/chart/?symbol=${found.tvSymbol}`,
            `${found.tvSymbol} ↗`,
            "icons/tradingview.svg",
        ),
        createLink(
            `https://finance.yahoo.com/quote/${found.yahooSymbol}`,
            `${found.exchange.tv}:${found.yahooSymbol} ↗`,
            "icons/yahoofinance.svg",
        ),
    );

    found.tickerNav.after(container);
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
