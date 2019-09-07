const MyExampleBuyingContract = artifacts.require("StepmotorContract");

module.exports = function(deployer) {
  deployer.deploy(MyExampleBuyingContract, 'contract:stepmotor');
};
