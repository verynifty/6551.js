require('dotenv').config()

const { ethers } = require("ethers");

const registry = require("../src/registry");


const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
const signer = new ethers.Wallet(your_private_key_string, provider);

const Registry = new registry(signer);


(async function() { 

    await Registry.getAccountFromAddress("0x10475071Fd1C08166f07E7e75208E31Cd4fAb601")


})()
