
const ERC6551Registry = require("./registry");
const ERC6551Account = require("./account");

function ERC6551(provider) {
    this.provider = provider;
    this.registry = new ERC6551Registry();
}

ERC6551.prototype.getAccount = function(chainId, tokenContract, tokenId, implementationAddress, salt) {
    return new ERC6551Account(this, this.registry, chainId, tokenContract, tokenId, implementationAddress, salt)
}

module.exports = ERC6551;

