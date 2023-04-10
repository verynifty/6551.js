function ERC6551Account(instance, chainId, tokenContract, tokenId, implementationAddress, salt) {
    this.instance = instance;
    this.chainId = chainId;
    this.tokenContract = tokenContract;
    this.tokenId = tokenId;
    this.implementationAddress = implementationAddress;
    this.salt = salt;
    this.address = this.instance.registry.getAccountAddress(chainId, tokenContract, tokenId, implementationAddress, salt);
}

ERC6551Account.prototype.isDeployed = async function() {
    return (await this.instance.provider.getCode(this.address)) == this.instance.registry.generateAccountBytecode(this.chainId, this.tokenContract, this.tokenId, this.implementationAddress, this.salt);
}

ERC6551Account.prototype.deploy = async function() {
    // make tx to create account
}

module.exports = ERC6551Account;

