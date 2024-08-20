const hre = require("hardhat");

async function getBalance(address) {
    const balance = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balance);
}

async function printBalance(address) {
    let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx ++;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp =memo.timestamp * 1000;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`At ${timestamp}: ${tipper} (${tipperAddress}) saying: ${message}`);
  }
}

async function main() {
    const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = BuyMeACoffee.deployed();

    console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);

    const addresses = [owner.address, tipper.address, tipper2.address, tipper3.address];
    console.log("== start ==");
    await printBalance(addresses);

    const tip = {value: hre.ethers.utils.parseEther("1")};
    await buyMeACoffee.connect(tipper).buyCoffee("Carolina", "You're the best!", tip);
    await buyMeACoffee.connect(tipper2).buyCoffee("Vitto", "Amazing teacher", tip);
    await buyMeACoffee.connect(tipper3).buyCoffee("Kay", "I love my Proof of Knowledge", tip);

    console.log("== tiped ==");
    await printBalances(addresses);

    await buyMeACoffee.connect(owner).withdrawTips();

    





}