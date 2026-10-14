# TickerHop

A small Firefox extension for faster stock research on Nordnet. It adds links from the stock you're viewing to its chart on TradingView and its page on Yahoo Finance, and lets you set a price alert, so you don't have to look up tickers and exchange codes by hand.

## What it does

**Chart links.** Under the stock's breadcrumb, two buttons open the stock on TradingView and Yahoo Finance in a new tab, with the correct symbol for each site:

| Site          | Example         |
| ------------- | --------------- |
| TradingView   | `OMXCOP:NOVO_B` |
| Yahoo Finance | `NOVO-B.CO`     |

**Price alert.** An input field below the links takes a target price. When the price on the page reaches it, the extension shows a desktop notification. The alert works while the stock's tab is open.

## Supported exchanges

| Nordnet (MIC)        | TradingView | Yahoo Finance |
| -------------------- | ----------- | ------------- |
| `xcse` Copenhagen    | `OMXCOP`    | `.CO`         |
| `xsto` Stockholm     | `OMXSTO`    | `.ST`         |
| `xhel` Helsinki      | `OMXHEX`    | `.HE`         |
| `xosl` Oslo          | `OSL`       | `.OL`         |
| `xnas` Nasdaq        | `NASDAQ`    | none          |
| `xnys` NYSE          | `NYSE`      | none          |
| `xase` NYSE American | `AMEX`      | none          |
| `xlon` London        | `LSE`       | `.L`          |
| `xetr` Xetra         | `XETR`      | `.DE`         |
| `xfra` Frankfurt     | `FWB`       | `.F`          |
| `xber` Berlin        | `BER`       | `.BE`         |
| `xtse` Toronto       | `TSX`       | `.TO`         |

## Installation

### Install

Download the latest signed `.xpi` from the [Releases](../../releases) page. In Firefox, open `about:addons`, click the settings icon, choose **Install Add-on From File** and select the file.

If the links don't appear, open TickerHop in `about:addons`, go to **Permissions and data**, and make sure access to the Nordnet sites is turned on.

### Development

Clone the repository:

```bash
git clone https://github.com/DenizIsikli/TickerHop.git
```

Open `about:debugging#/runtime/this-firefox`, click **Load Temporary Add-on** and select `manifest.json` from the cloned folder. Click **Reload** after making changes.

Temporary add-ons may need site access granted manually. Click the extensions icon in the toolbar and allow TickerHop on Nordnet.

### Releasing your own build

Signing requires a free account on [addons.mozilla.org](https://addons.mozilla.org) and your own fork of this repository, since the release workflow runs with your repository's secrets.

1. Fork the repository on GitHub and clone your fork.
2. Change `id` in `manifest.json` to your own, for example `ticker-hop@yourname`.
3. Generate API keys in the Developer Hub under **Tools > Manage API Keys**.
4. Add them as repository secrets in your fork under **Settings > Secrets and variables > Actions**, named `AMO_JWT_ISSUER` and `AMO_JWT_SECRET`.
5. Set `version` in `manifest.json` to a number not yet tagged in your fork, for example `1.5`. Commit the change, then push a tag with the same number:

```bash
   git add manifest.json
   git commit -m "Release 1.5"
   git push
   git tag v1.5
   git push origin v1.5
```

The release workflow signs the extension and publishes the `.xpi` on your fork's Releases page.

## Disclaimer

TickerHop is not affiliated with Nordnet, TradingView or Yahoo. The price alert is a convenience feature, not trading advice.

## License

MIT
