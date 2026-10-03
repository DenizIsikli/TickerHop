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

const tickerLinks = {
    create(found) {
        return [
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
        ];
    },
};
