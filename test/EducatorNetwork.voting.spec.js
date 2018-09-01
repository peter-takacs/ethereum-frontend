const EducatorNetwork = artifacts.require('EducatorNetwork');
const catchRevert = require("./exceptions.js").catchRevert;

contract('Voting status', async(accounts) => {
    const initialAccount = accounts[0];
    const secondaryAccount = accounts[1];
    const candidateAccount = accounts[2];
    let instance;

    before(async () => {
        instance = await EducatorNetwork.deployed();
        await instance.requestAddition(secondaryAccount, { from: initialAccount });
    })

    it('Should return empty arrays for candidates who aren\'t considered', async () => {
        const votes = await instance.getVotesForCandidate.call(candidateAccount);
        assert.equal(votes[0].length, 0);
        assert.equal(votes[1].length, 0);
    })

    it('Should return pending votes for all members but the initiator', async () => {
        await instance.requestAddition(candidateAccount, {from: secondaryAccount});

        const votes = await instance.getVotesForCandidate.call(candidateAccount);
        assert.equal(votes[0][1], secondaryAccount);
        assert.equal(votes[0][0], initialAccount);
        assert.equal(votes[1][1], 1);
        assert.equal(votes[1][0], 0);
    });

    it('Should return accepted votes after voting', async() => {
        await instance.requestAddition(candidateAccount, {from: initialAccount});

        const votes = await instance.getVotesForCandidate.call(candidateAccount);
        assert.equal(votes[0][1], secondaryAccount);
        assert.equal(votes[0][0], initialAccount);
        assert.equal(votes[1][1], 1);
        assert.equal(votes[1][0], 1);
    });
})