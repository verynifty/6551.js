# 6551.js

6551.js is a tiny library to help working with Non-fungible Token Bound Accounts. 

You can read more about them here:
- [EIP on ethereum.org](https://eips.ethereum.org/EIPS/eip-6551)
- [EIP on ethereum magicians](https://ethereum-magicians.org/t/erc-6551-non-fungible-token-bound-accounts/13030)
- [EIP on ethereum.org](https://eips.ethereum.org/EIPS/eip-6551)
- [Official implementation](https://github.com/tokenbound/contracts)
- [Official SDK](https://github.com/tokenbound/sdk)

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

This will generate the transaction data needed to deploy an account for a specifi NFT.

```
const NFT_CONTRACT = "0x5af0d9827e0c53e4799bb226655a1de152a425a5";
const NFT_ID = 1;

let unsignedTX = await Registry.prepareCreateAccount(NFT_CONTRACT, NFT_ID, Registry.DEFAULT_IMPLEMENTATION); // Implementation address and Salt are optional
let pendingTX = await signer.sendTransaction(unsignedTX)
```

### Compute the address of an account

```
let expectedAddress = await Registry.getAccountAddress(NFT_CONTRACT, NFT_ID); // Implementation address and Salt are optional
```

### Instantiate an account

There is two way to get an instance of an **Account**. The Account is then used to make calls/get informations.

```
// From parameters
let Account = await Registry.getAccount(NFT_CONTRACT, NFT_ID);  // Implementation address and Salt are optional

// From a known address
let Account2 = await Registry.getAccountFromAddress("0x324..4323434");
```


### Make a call to an account

You can make a call to an account using prepareExecuteCall. This will generate an unsigned transaction: 

```
// target contract, data, value in wei
let unsignedTX = await Account.prepareExecuteCall("0x324..4323434", "0x", 0); 
let pendingTX = await signer.sendTransaction(unsignedTX)
```

### Getters on account:

```
let nonce = await Account.owner();
let nonce = await Account.nonce();
let nonce = await Account.isCreated(); // returns if the given account is properly deployed at the address

```

## License and contribution

MIT License, feel free to PR or open new issues.

