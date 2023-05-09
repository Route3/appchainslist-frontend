// Force bundling of images
import PolygonLogo from "./assets/images/ecosystems/polygon.png";
import AvalancheLogo from "./assets/images/ecosystems/avalanche.png";
import BinanceLogo from "./assets/images/ecosystems/binance.png";
import CosmosLogo from "./assets/images/ecosystems/cosmos.png";
import PolkadotLogo from "./assets/images/ecosystems/polkadot.png";

function getLogo(ecosystem) {
    const mapping = {
        "polygon": PolygonLogo,
        "avalanche": AvalancheLogo,
        "binance": BinanceLogo,
        "cosmos": CosmosLogo,
        "polkadot": PolkadotLogo
    }

    return mapping[ecosystem.toLowerCase()];
}

export default getLogo;