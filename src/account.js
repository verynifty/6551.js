const accountABI = require("../abis/ERC6551Account.json");
const { ethers } = require("ethers");

function ERC6551Account(instance, chainId, tokenContract, tokenId, implementationAddress, salt) {
    this.instance = instance;
    this.chainId = chainId;
    this.tokenContract = tokenContract;
    this.tokenId = tokenId;
    this.implementationAddress = implementationAddress;
    this.salt = salt;
    this.address = this.instance.registry.getAccountAddress(chainId, tokenContract, tokenId, implementationAddress, salt);
    this.contract = new ethers.Contract(this.address, accountABI);
    this.contract.attach(this.instance.provider);
}

ERC6551Account.prototype.isDeployed = async function() {
    return (await this.instance.provider.getCode(this.address)) == this.instance.registry.generateAccountBytecode(this.chainId, this.tokenContract, this.tokenId, this.implementationAddress, this.salt);
}

ERC6551Account.prototype.deploy = async function() {
    // make tx to create account
}

ERC6551Account.prototype.executeCall = async function() {
    // make tx to account
}

ERC6551Account.prototype.nonce = async function() {
    // get nonce
}

ERC6551Account.prototype.owner = async function() {
    // get owner
}

module.exports = ERC6551Account;

