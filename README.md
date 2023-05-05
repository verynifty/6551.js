# 6551.js

NFT bound account toolkit for JS. 

## Installation

You'll need to install the 6551.js package and have an instance of ethers.

```
npm install 6551.js --save
```

Then import in your project:

```
const { ethers } = require("ethers");

const ERC6551Registry = require("6551.js");

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
const Registry = new ERC6551Registry(provider);

```

## Usage

### Create an account

```
const NFT_CONTRACT = "0x5af0d9827e0c53e4799bb226655a1de152a425a5";
const NFT_ID = 1;

let unsignedTX = await Registry.prepareCreateAccount(NFT_CONTRACT, NFT_ID, Registry.DEFAULT_IMPLEMENTATION);
let pendingTX = await signer.sendTransaction(unsignedTX)
```

