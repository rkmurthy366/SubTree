const main = async () => {
  const [owner, addr1, addr2, addr3] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Ticket");
  const ticketContract = await domainContractFactory.deploy();
  await ticketContract.deployed();

  console.log("Contract deployed to:", ticketContract.address);

  let txn;
  txn = await ticketContract.register();
  await txn.wait();

  const Addr1 = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
  const Addr2 = "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"
  const Addr3 = "0x90f79bf6eb2c4f870365e785982e1f101e93b906"

  let address = await ticketContract.getSubscriber(1);
  console.log("Owner of #0001:", address);

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
