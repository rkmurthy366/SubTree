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

  const Addr1 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
  const Addr2 = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc";
  const Addr3 = "0x90f79bf6eb2c4f870365e785982e1f101e93b906";

  let txn, address, planDetails, ticketDetails;

  // Full Test 
  /*
  // Create 2 plans
  txn = await planContract.createPlan("Plan1", 100, 20);
  await txn.wait();

  txn = await planContract.createSpecialPlan("Plan2", 200, 1, 30, 3);
  await txn.wait();

  // Enter ticketAddr into Plan contract
  txn = await planContract.ticketContract(ticketContract.address);
  await txn.wait();

  // // View planDetails
  // planDetails = await planContract.plans(1);
  // console.log("Plan 1", planDetails);

  // planDetails = await planContract.plans(2);
  // console.log("Plan 2", planDetails);

  // Register User
  txn = await ticketContract.register();
  await txn.wait();

  ticketDetails = await ticketContract.tickets(1);
  console.log("Owner of #0001:", ticketDetails[1]);

  txn = await ticketContract.connect(addr2).register();
  await txn.wait();

  ticketDetails = await ticketContract.tickets(2);
  console.log("Owner of #0002:", ticketDetails[1]);

  // Buy Plan
  txn = await planContract.buyPlan(1, 1, { value: 100 });
  await txn.wait();

  ticketDetails = await ticketContract.tickets(1);
  console.log("#0001 Details", ticketDetails);

  planDetails = await planContract.plans(1);
  console.log("Plan 1", planDetails);

  txn = await planContract.connect(addr2).buyPlan(2, 2, { value: 200 });
  await txn.wait();

  ticketDetails = await ticketContract.tickets(2);
  console.log("#0002 Details", ticketDetails);

  planDetails = await planContract.plans(2);
  console.log("Plan 2", planDetails);

  txn = await planContract.buyPlan(2, 1, { value: 200 });
  await txn.wait();
  */

  // Transfer Test
  /*
  console.log("Addr 1 = ", Addr1);
  txn = await ticketContract.transferTicket(1, Addr1);
  await txn.wait();
  console.log("Ticket #0001: transferred from %s to %s", address, Addr1);
  address = await ticketContract.connect(addr1).getSubscriber(1);
  console.log("Owner of #0001:", address);

  console.log("Addr 2 = ", Addr2);
  txn = await ticketContract.connect(addr1).transferTicket(1, Addr2);
  await txn.wait();
  console.log("Ticket #0001: transferred from %s to %s", address, Addr2);
  address = await ticketContract.connect(addr2).getSubscriber(1);
  console.log("Owner of #0001:", address);

  console.log("Addr 3 = ", Addr3);
  txn = await ticketContract.connect(addr2).transferTicket(1, Addr3);
  await txn.wait();
  console.log("Ticket #0001: transferred from %s to %s", address, Addr3);
  address = await ticketContract.connect(addr3).getSubscriber(1);
  console.log("Owner of #0001:", address);
  */
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
