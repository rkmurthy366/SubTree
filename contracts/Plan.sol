// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface InterfaceTicket {
  function updateTicketDetails(uint _tId, string calldata _planName, uint _planId, uint _subscriptionCost, uint _subscriptionStart, uint _subscriptionEnd) external;
}

contract Plan{
  
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  address Owner;

  struct planDetails {
    uint planId;
    string planName;
    uint planCost;
    uint planStart;
    uint planDuration;
    uint planEnd;
    bool planStarted;
    uint planSubscribers;
  }

  // currency input is in wei (1 eth = 10^18 wei)
  // planCost -> in wei
  // time input is in days
  // planStart -> After how many days from now you want this plan to activate for users to buy
  // planEnd -> After how many days after planStart you want this plan to deactivate disabling users to buy
  // planDuration -> Duration of the plan
  // planStarted -> did the plan start??

  // Mapping of tokenId with planDetails struct
  mapping(uint256 => planDetails) public plans;

  // Mapping of address with bool for planControllers
  mapping(address => bool) public planControllers;

  address public ticketContractAddr;

  constructor () {
    Owner = msg.sender;
    planControllers[Owner] = true;
    console.log("Plan.sol contract is deployed");
  }

  modifier onlyOwner {
    require(msg.sender == Owner, "Only Owner can call this function");
    _;
  }

  function addPlanControllers(address _user) public onlyOwner {
    planControllers[_user] = true;
  }

  function removePlanControllers(address _user) public onlyOwner {
    planControllers[_user] = false;
  }

  modifier onlyPlanController {
    require(planControllers[msg.sender], "Only PlanController can call this function");
    _;
  }

  // cannot be edited later because plan starts immediately after plan is created
  function createPlan(string calldata _planName, uint _planCost, uint _planDuration) public onlyPlanController { 
    require(bytes(_planName).length != 0, "planName cannot be empty");
    require(_planDuration != 0, "planDuration cannot be 0 days");
    uint256 newTokenId = _tokenIds.current() + 1;
    planDetails storage newPlan = plans[newTokenId];
    newPlan.planId = newTokenId;
    newPlan.planName = _planName;
    newPlan.planCost = _planCost;
    newPlan.planStart = block.timestamp;
    newPlan.planDuration = _planDuration * 1 days;
    newPlan.planStarted = true;
    _tokenIds.increment();
  }

  // can be edited later as long as plan dint start
  function createSpecialPlan(string calldata _planName, uint _planCost, uint _planStart, uint _planDuration, uint _planEnd) public onlyPlanController {
    require(bytes(_planName).length != 0, "planName cannot be empty");
    require(_planDuration != 0, "planDuration cannot be 0 days");
    require(_planEnd != 0, "planEnd cannot be 0 days");
    uint256 newTokenId = _tokenIds.current() + 1;
    planDetails storage newPlan = plans[newTokenId];
    newPlan.planId = newTokenId;
    newPlan.planName = _planName;
    newPlan.planCost = _planCost;
    newPlan.planStart = block.timestamp + _planStart * 1 days;
    newPlan.planDuration = _planDuration * 1 days;
    newPlan.planEnd = newPlan.planStart + _planEnd * 1 days;
    newPlan.planStarted = true;
    _tokenIds.increment();
  }

  function deletePlan(uint _planId) public onlyPlanController {
    planDetails storage Plan = plans[_planId];
    require(Plan.planStarted == true, "Cannot delete a deleted Plan");
    Plan.planStarted = false;
  }

  // only SpecialPlans can be editted
  function editPlan(uint _planId, string calldata _planName, uint _planCost, uint _planStart, uint _planDuration, uint _planEnd) public onlyPlanController {
    planDetails storage Plan = plans[_planId];
    require(block.timestamp < Plan.planStart, "Plan cannot be edited because plan has already started");
    require(Plan.planStarted == true, "Cannot Edit a Deleted Plan");
    require(_planEnd !=0, "_planEnd cannot be 0");
    Plan.planName = _planName;
    Plan.planCost = _planCost;
    Plan.planDuration = _planDuration * 1 days;
    Plan.planStart = block.timestamp + _planStart * 1 days;
    Plan.planEnd = Plan.planStart + _planEnd * 1 days;
  }

  function getPlanDetails(uint _planId) public view returns (planDetails memory) {
    return plans[_planId];
  }

  function ticketContract(address _ticketContractAddr) public {
    ticketContractAddr = _ticketContractAddr;
  }

  function buyPlan(uint _planId, uint _tId) external payable{
    planDetails storage Plan = plans[_planId];
    require(msg.value == Plan.planCost, "money sent != planCost");
    Plan.planSubscribers += 1;
    string memory _planName = Plan.planName;
    uint _subscriptionCost = Plan.planCost;
    uint _subscriptionStart = block.timestamp;
    uint _subscriptionEnd = _subscriptionStart + Plan.planDuration;
    InterfaceTicket(ticketContractAddr).updateTicketDetails(_tId, _planName, _planId, _subscriptionCost, _subscriptionStart, _subscriptionEnd);
  }

}