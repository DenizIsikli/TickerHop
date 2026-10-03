browser.runtime.onMessage.addListener((msg) => {
    if (msg.type === "price-alert") {
        browser.notifications.create({
            type: "basic",
            title: "Ticker Hop",
            message: msg.message,
        });
    }
});
