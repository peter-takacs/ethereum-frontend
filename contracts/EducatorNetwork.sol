pragma solidity 0.4.24;

contract EducatorNetwork {
    
    event logUint(uint256);
    
    address[] members;
    mapping(address => mapping(address => bool)) votesInProgress;
    
    function castVote(address sender, address newMember, bool vote) private {
        votesInProgress[newMember][sender] = vote;
    }
    
    function checkIfPastThreshold(address newMember) private view returns(bool) {
        uint positiveVotes = 0;
        for (uint i = 0; i < members.length; i++) {
            if (votesInProgress[newMember][members[i]]) {
                positiveVotes++;
            }
        }
        if (60 * members.length < 100 * positiveVotes) {
            return true;
        }
        return false;
    }
    
    constructor() public {
        members = new address[](1);
        members[0] = msg.sender;
    }
    
    function isMember(address member) public view returns (bool){
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == member) {
                return true;
            }
        }
        return false;
    }
    
    function getMembers() public view returns(address[]) {
        return members;
    }
    
    function requestAddition(address newMember) public {
        if (isMember(newMember)) {
            return;
        }
        if (!isMember(msg.sender)) {
            revert();
        }
        castVote(msg.sender, newMember, true);
        if (checkIfPastThreshold(newMember)) {
            address[] memory updatedMembers = new address[](members.length + 1);
            for (uint i = 0; i < members.length; i++) {
                updatedMembers[i] = members[i];
            }
            updatedMembers[members.length] = newMember;
            members = updatedMembers;
        }
    }
}