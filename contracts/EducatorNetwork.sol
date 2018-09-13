pragma solidity 0.4.24;

contract EducatorNetwork {
    
    event logUint(uint256);

    enum VoteStatus {
        Pending,
        Accept,
        Reject
    }

    address[] members;
    address[] candidates;
    mapping(address => mapping(address => VoteStatus)) votesInProgress;
    
    function castVote(address sender, address newMember, VoteStatus vote) private {
        votesInProgress[newMember][sender] = vote;
    }
    
    function checkIfPastThreshold(address newMember) private view returns(bool) {
        uint positiveVotes = 0;
        for (uint i = 0; i < members.length; i++) {
            if (votesInProgress[newMember][members[i]] == VoteStatus.Accept) {
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
        candidates = new address[](0);
    }

    function contains(address[] haystack, address needle) private pure returns (bool) {
        for (uint i = 0; i < haystack.length; i++) {
            if (haystack[i] == needle) {
                return true;
            }
        }

        return false;
    }
    
    function isMember(address member) public view returns (bool){
        return contains(members, member);
    }
    
    function getMembers() public view returns(address[]) {
        return members;
    }

    function getCandidates() public view returns (address[]) {
        return candidates;
    }

    function getVotesForCandidate(address candidate) public view returns(address[], VoteStatus[]) {
        if (!contains(candidates, candidate)) {
            return (new address[](0), new VoteStatus[](0));
        }
        address[] memory resultAddresses = new address[](members.length);
        VoteStatus[] memory resultVoteStatuses = new VoteStatus[](members.length);
        mapping(address => VoteStatus) castVotes = votesInProgress[candidate];
        for (uint i = 0; i < members.length; i++) {
            resultAddresses[i] = members[i];
            resultVoteStatuses[i] = castVotes[members[i]];
        }
        return (resultAddresses, resultVoteStatuses);
    }
    
    function requestAddition(address newMember) public  returns (bool) {
        if (isMember(newMember)) {
            return false;
        }
        if (!isMember(msg.sender)) {
            revert();
            return false;
        }

        if (!contains(candidates, newMember)) {
            address[] memory updatedCandidates = new address[](candidates.length + 1);
            for (uint i = 0; i < candidates.length; i++) {
                updatedCandidates[i] = candidates[i];
            }
            updatedCandidates[candidates.length] = newMember;
            candidates = updatedCandidates;
        }

        castVote(msg.sender, newMember, VoteStatus.Accept);
        
        
        if (checkIfPastThreshold(newMember)) {
            address[] memory updatedMembers = new address[](members.length + 1);
            for (uint j = 0; j < members.length; j++) {
                updatedMembers[j] = members[j];
            }
            updatedMembers[members.length] = newMember;
            members = updatedMembers;

            address[] memory reducedCandidates = new address[](candidates.length - 1);
            uint targetIndex = 0;
            for (uint k = 0; k < candidates.length; k++) {
                if (candidates[k] != newMember) {
                    reducedCandidates[targetIndex] = candidates[k];
                    targetIndex++;
                }
            }
            candidates = reducedCandidates;
            return true;
        }

        return false;
    }
}