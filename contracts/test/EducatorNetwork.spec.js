const EducatorNetwork = artifacts.require('EducatorNetwork');

contract('Test initial state', async (accounts) => {

    let initialAccount = accounts[0];

    it('Should have one initial member', async () => {
        let instance = await EducatorNetwork.deployed();
        let members = await instance.getMembers();
        assert.equal(1, members.length);
    });

    it('Should add a new member if requested', async() => {
        let instance = await EducatorNetwork.deployed();

        await instance.requestAddition.call(accounts[1], {from: initialAccount, gas: 500000});

        let members = await instance.getMembers();
        console.log(members);
        assert.include(members, accounts[0]);
        assert.include(members, accounts[1]);
    })
})