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
