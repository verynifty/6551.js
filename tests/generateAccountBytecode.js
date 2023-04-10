
const registry = require("../src/registry");

const Registry = new registry();

const testAddress = "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1"

let bytecode = Registry.generateAccountBytecode(1, "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 1, "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 0);

console.log(bytecode)

let address = Registry.getAccountAddress(1, "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 1, "0x3DB6292002BEf4DF017F566a0D038755Bb2AdAE1", 0);

console.log(address)

