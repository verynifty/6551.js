require('dotenv').config()

const { ethers } = require("ethers");

const registry = require("../src/registry");


const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const Registry = new registry(provider);

const NFT_CONTRACT = "0x5af0d9827e0c53e4799bb226655a1de152a425a5";
const NFT_ID = 1;

(async function() { 

    //await Registry.getAccountFromAddress("0x10475071Fd1C08166f07E7e75208E31Cd4fAb601")
    let a = await Registry.prepareCreateAccount(NFT_CONTRACT, NFT_ID, NFT_CONTRACT, 0);
    console.log(a)

    let b = await signer.sendTransaction(a)
console.log(b)
})()
