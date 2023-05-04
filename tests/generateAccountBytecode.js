
const registry = require("../src/registry");

const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");

const Registry = new registry(provider);

const testAddress = "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1";

(async function () {

    let bytecode = await Registry.generateAccountBytecode("0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 1, "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 0);

    console.log("Account bytecode", bytecode)

    let address = await Registry.getAccountAddress("0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 1, "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 0);

    console.log("Account address", address)

})()
