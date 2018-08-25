pragma solidity 0.4.24;
import "./EducatorNetwork.sol";

contract Certificates {

    struct Assertion {
        uint256 hashedAssertion;
        address issuer;
        bool isRevoked;
    }

    mapping(address => Assertion[]) registry;
    EducatorNetwork educatorNetwork;
    
    constructor(address educatorNetworkAddress) public {
        educatorNetwork = EducatorNetwork(educatorNetworkAddress);
    }
    
    function getCertificates(address candidate) public view returns(uint256[]) {
        if (registry[candidate].length == 0) {
            return new uint256[](0);
        }
        Assertion[] memory candidateAssertions = registry[candidate];
        uint256[] memory result = new uint256[](candidateAssertions.length);
        for (uint i = 0; i < result.length; i++) {
            if (!candidateAssertions[i].isRevoked) {
                result[i] = candidateAssertions[i].hashedAssertion;
            }
        }
        return result;
    }

    function contains(uint256[] list, uint256 entry) private pure returns (bool) {
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == entry) {
                return true;
            }
        }
        return false;
    }

    function revoke(address holder, uint256 certificate) public returns (bool) {
        address sender = msg.sender;
        Assertion[] memory candidateAssertions = registry[holder];
        if (educatorNetwork.isMember(sender)) {
            for (uint i = 0; i < candidateAssertions.length; i++) {
                if (candidateAssertions[i].hashedAssertion == certificate) {
                    candidateAssertions[i].isRevoked = true;
                    return true;
                }
            }
        }
        revert();
        return false;
    }

    function assign(address recipient, uint256 certificate) public returns (bool) {
        address sender = msg.sender;
        if (educatorNetwork.isMember(sender)) {
            Assertion memory assertion;
            assertion.hashedAssertion = certificate;
            assertion.isRevoked = true;
            assertion.issuer = sender;
            registry[recipient].push(assertion);
            return true;
        }
        revert();
        return false;
    }
}