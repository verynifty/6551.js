function ERC6551Registry(provider, address = null) {
    this.provider = provider;
    if (address == null) {
        this.address = this.DEFAULT_ADDRESS;
    }
}

ERC6551Registry.prototype.DEFAULT_ADDRESS = "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1";

module.exports = ERC6551Registry;

