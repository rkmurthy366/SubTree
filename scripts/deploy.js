const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("builder");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  console.log(
    `Verify with:\n npx hardhat verify --network mumbai ${nftContract.address}`
  );

  let txn = await domainContract.register("Naruto", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain Naruto.builder");

  txn = await domainContract.setRecord(
    "Naruto",
    "Am I Naruto or a Spiderman??"
  );
  await txn.wait();
  console.log("Set record for Naruto.builder");

  const address = await domainContract.getAddress("Naruto");
  console.log("Owner of domain Naruto:", address);

  const record = await domainContract.getRecord("Naruto");
  console.log("Record of domain Naruto:", record);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
