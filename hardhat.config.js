require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "rinkeby-rpc-url";
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "mumbai-rpc-url";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your private key";
const POLYSCAN_API_KEY =
  process.env.POLYSCAN_API_KEY || "Your polyscan API key";

module.exports = {
  solidity:"0.8.10",
  paths:{
    artifacts:'./src/artifacts'
  },
  networks:{
    hardhat:{
      chainId:1337
    }
  }

}
