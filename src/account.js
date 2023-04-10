const accountABI = require("../abis/ERC6551Account.json");
const { ethers } = require("ethers");

function ERC6551Account(instance, chainId, tokenContract, tokenId, implementationAddress, salt) {
    this.registry = instance;
    this.chainId = chainId;
    this.tokenContract = tokenContract;
    this.tokenId = tokenId;
    this.implementationAddress = implementationAddress;
    this.salt = salt;
    this.address = this.registry.getAccountAddress(chainId, tokenContract, tokenId, implementationAddress, salt);
    this.contract = (new ethers.Contract(this.address, accountABI)).connect(this.registry.provider);
}

ERC6551Account.prototype.isDeployed = async function() {
    return (await this.registry.provider.getCode(this.address)) == this.registry.generateAccountBytecode(this.chainId, this.tokenContract, this.tokenId, this.implementationAddress, this.salt);
}

ERC6551Account.prototype.deploy = async function() {
    // make tx to create account
}

ERC6551Account.prototype.executeCall = async function() {
    // make tx to account
}

ERC6551Account.prototype.nonce = async function() {
    return (await this.contract.nonce());
}

ERC6551Account.prototype.owner = async function() {
    return (await this.contract.owner());
}

module.exports = ERC6551Account;