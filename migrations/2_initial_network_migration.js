var Certificates = artifacts.require("Certificates.sol");
var EducatorNetwork = artifacts.require("EducatorNetwork.sol");

module.exports = function(deployer) {
    deployer.deploy(EducatorNetwork).then(() => 
      deployer.deploy(Certificates, EducatorNetwork.address)
    )
};
