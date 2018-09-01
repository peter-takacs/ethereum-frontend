const EducatorNetwork = artifacts.require('EducatorNetwork');
const catchRevert = require("./exceptions.js").catchRevert;

contract('Test initial state', async (accounts) => {

    // NOTE: contract state is NOT reset within the same contract()
    // block. `it` sections are executed in the order they appear
    // in the source. There are dependencies between the `it` sections,
    // keep that in mind when reordering or parallel testing.

    let initialAccount = accounts[0];

    it('Should have one initial member', async () => {
        let instance = await EducatorNetwork.deployed();
        let members = await instance.getMembers.call();
        assert.equal(members.length, 1);
    });

    it('Should not have any candidates', async() => {
        let instance = await EducatorNetwork.deployed();
        let candidates = await instance.getCandidates.call();
        assert.equal(candidates.length, 0);
    })

});