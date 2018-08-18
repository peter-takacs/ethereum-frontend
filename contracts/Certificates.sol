pragma solidity 0.4.24;
import "./EducatorNetwork.sol";

contract Certificates {

    mapping(address => uint256[]) registry;
    EducatorNetwork educatorNetwork;
    
    constructor(address educatorNetworkAddress) public {
        educatorNetwork = EducatorNetwork(educatorNetworkAddress);
    }
    
    function getCertificates(address candidate) public view returns(uint256[]) {
        return registry[candidate];
    }

    function contains(uint256[] list, uint256 entry) private pure returns (bool) {
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == entry) {
                return true;
            }
        }
        return false;
    }

    function remove(uint256[] list, uint256 element) private view returns (uint256[]) {
        if (contains(list, element)) {
            uint256[] memory result = new uint256[](list.length);
            uint originalIndex = 0;
            uint newIndex = 0;
            while (originalIndex < list.length) {
                if (list[originalIndex] != element) {
                    result[newIndex] = list[originalIndex];
                    newIndex++;
                }
                originalIndex++;
            }
            list[list.length - 1] = 0;
            for (uint i = 0; i < list.length; i++) {
                list[i] = result[i];
            }
        }
        return list;
    }
    
    function revoke(address holder, uint256 certificate) public returns (bool) {
        address sender = msg.sender;
        if (educatorNetwork.isMember(sender)) {
            registry[holder] = remove(registry[holder], certificate);
        }
        revert();
        return false;
    }

    function assign(address recipient, uint256 certificate) public returns (bool) {
        address sender = msg.sender;
        if (educatorNetwork.isMember(sender)) {
            registry[recipient].push(certificate);
            return true;
        }
        revert();
        return false;
    }
}