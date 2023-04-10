const { ethers } = require("ethers");

const ERC6551Account = require("./account");

function ERC6551Registry(provider, address = null) {
    this.provider = provider;
    if (address == null) {
        this.address = this.DEFAULT_ADDRESS;
    }
}

ERC6551Registry.prototype.DEFAULT_ADDRESS = "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1";
ERC6551Registry.prototype.DEFAULT_BYTECODE = "0x60208038033d393d517f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5560f78060343d393df3363d3d3760003560e01c635c60da1b1461004e573d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e610049573d6000fd5b3d6000f35b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc543d5260203df3"
ERC6551Registry.prototype.DEPLOYED_BYTECODE = "0x363d3d3760003560e01c635c60da1b1461004e573d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e610049573d6000fd5b3d6000f35b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc543d5260203df3"

ERC6551Registry.prototype.getAccount = function(chainId, tokenContract, tokenId, implementationAddress, salt) {
    return new ERC6551Account(this, this.registry, chainId, tokenContract, tokenId, implementationAddress, salt)
}

ERC6551Registry.prototype.doesAccountExists = async function(chainId, tokenContract, tokenId, implementationAddress, salt) {
    const account = new ERC6551Account(this, this.registry, chainId, tokenContract, tokenId, implementationAddress, salt)
    return await account.isDeployed()
}

ERC6551Registry.prototype.generateAccountBytecode = function(chainId, tokenContract, tokenId, implementationAddress, salt) {
    const appendData = ethers.AbiCoder.defaultAbiCoder().encode(["uint256", "uint256", "address", "uint256", "address"], [salt, chainId, tokenContract, tokenId, implementationAddress]).replace("0x", "");
    const finalBytecode = this.DEFAULT_BYTECODE + appendData;
    return finalBytecode;
}

ERC6551Registry.prototype.getAccountAddress = function(chainId, tokenContract, tokenId, implementationAddress, salt) {
    const bytecode = this.generateAccountBytecode(chainId, tokenContract, tokenId, implementationAddress, salt);
    const address = ethers.getCreate2Address(this.DEFAULT_ADDRESS, ethers.solidityPacked(["uint256"], [salt]), ethers.keccak256(bytecode))
    return address;
}


// a helper to encapsulate params to be used p = makeParams(a, b, c...) => getAccount(...p)
ERC6551Registry.prototype.makeParams = function(chainId, tokenContract, tokenId, implementationAddress, salt) {
    return [chainId, tokenContract, tokenId, implementationAddress, salt];
}

ERC6551Registry.prototype.getAccountFromAddress = async function(address) {
    let bytecode = await this.provider.getCode(address);
    if (!bytecode.startsWith(this.DEPLOYED_BYTECODE)) {
        return null;
    }
    let contract = (new ethers.Contract(address, require("../abis/UUPS.json"))).connect(this.provider)
    const implementation = await contract.implementation();
    const accountData = ethers.AbiCoder.defaultAbiCoder().decode(["uint256", "uint256", "address", "uint256"], "0x" + bytecode.replace(this.DEPLOYED_BYTECODE, ""));
    console.log(implementation, accountData)
    // need to return an instance of account
}

module.exports = ERC6551Registry;

