pragma solidity 0.4.24;
import "./EducatorNetwork.sol";

contract Certificates {

    mapping(address => uint128[]) registry;
    mapping(uint128 => uint128) certRegistry;
    EducatorNetwork educatorNetwork;
    
    constructor(address educatorNetworkAddress) public {
        educatorNetwork = EducatorNetwork(educatorNetworkAddress);
    }
    
    function getCertificates(address candidate) public view returns(uint128[]) {
        return registry[candidate];
    }

    function contains(uint128[] list, uint128 entry) private pure returns (bool) {
        for (uint i = 0; i < list.length; i++) {
            if (list[i] == entry) {
                return true;
            }
        }
        return false;
    }

    function remove(uint128[] list, uint128 element) private view returns (uint128[]) {
        if (contains(list, element)) {
            uint128[] memory result = new uint128[](list.length);
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
    
    function revoke(address holder, uint128 certificate) public returns (bool) {
        address sender = msg.sender;
        if (educatorNetwork.isMember(sender)) {
            registry[holder] = remove(registry[holder], certificate);
        }
        revert();
        return false;
    }

    function assign(address recipient, uint128 certificate) public returns (bool) {
        address sender = msg.sender;
        if (educatorNetwork.isMember(sender)) {
            registry[recipient].push(certRegistry[certificate]);
            return true;
        }
        revert();
        return false;
    }
}