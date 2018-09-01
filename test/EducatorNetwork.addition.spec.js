const EducatorNetwork = artifacts.require('EducatorNetwork');
const catchRevert = require("./exceptions.js").catchRevert;

contract('Addition of new members', async(accounts) => {

    let initialAccount = accounts[0];

    it('Should add a new member if requested', async() => {
        let additionalAccount = accounts[1];
        
        let instance = await EducatorNetwork.deployed();

        await instance.requestAddition(accounts[1], 
            {from: initialAccount, gas: 500000}
        );

        let members = await instance.getMembers.call();
        let candidates = await instance.getCandidates.call();
        assert.include(members, initialAccount);
        assert.include(members, additionalAccount);
        assert.include(candidates, additionalAccount);
    });

    it('Should not add a new member without majority', async() => {
        let secondAccount = accounts[2];

        let instance = await EducatorNetwork.deployed();
        await instance.requestAddition(secondAccount, {from: initialAccount, gas: 500000});

        let members = await instance.getMembers.call();
        let candidates = await instance.getCandidates.call();
        assert.notInclude(members, secondAccount);
        assert.include(candidates, secondAccount);
    });

    it('Should add the new member with majority', async () => {
        let secondAccount = accounts[2];

        let instance = await EducatorNetwork.deployed();
        await instance.requestAddition(secondAccount, {from: accounts[1], gas: 500000});

        let members = await instance.getMembers.call();
        let candidates = await instance.getCandidates.call();
        assert.include(members, secondAccount);
        assert.include(candidates, secondAccount);
    });

    it('Should not add a candidate if the submitter is not a member', async () => {
        let dummyAccount = accounts[3];

        let instance = await EducatorNetwork.deployed();
        await catchRevert(
            instance.requestAddition(accounts[4], {from: dummyAccount, gas: 500000})
        );

        let members = await instance.getMembers.call();
        let candidates = await instance.getCandidates.call();

        assert.notInclude(members, accounts[4]);
        assert.notInclude(candidates, accounts[4]);
    })
});