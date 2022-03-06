const main = async () => {
  const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();
  const domainContractFactory1 = await hre.ethers.getContractFactory("Ticket");
  const ticketContract = await domainContractFactory1.deploy();
  await ticketContract.deployed();
  console.log("TicketContract deployed to:", ticketContract.address);

  const domainContractFactory2 = await hre.ethers.getContractFactory("Plan");
  const planContract = await domainContractFactory2.deploy();
  await planContract.deployed();
  console.log("PlanContract deployed to:", planContract.address);

  // Enter ticketAddr into Plan contract
  txn = await planContract.ticketContract(ticketContract.address);
  await txn.wait();
  console.log("TicketAddr added to Plan Contract")
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
