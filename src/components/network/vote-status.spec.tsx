import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CandidateStatus from '../../containers/network/candidate-status';
jest.doMock('../../containers/network/candidate-status');
import { dummyAddress, dummyAccount } from '../../utils/test/address';
import VoteStatus from './vote-status';
import { VoteStatus as VoteStatusEnum } from '../../types/vote' ;
import { Address } from '../../types/ethereum-address';

test('Renders correctly with no data', () => {
    const component = renderer.create(
            <VoteStatus
                candidateStatuses={[]}
                account={null}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
});

test('Renders correctly with data', () => {
    const votes = new Map<Address, VoteStatusEnum>();
    votes.set(dummyAddress(1), VoteStatusEnum.Accept);
    const component = renderer.create(
        <VoteStatus
            account={null}
            candidateStatuses={[
                {
                    candidate: dummyAddress(0),
                    votes
                }
            ]}
        />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})


test('Renders correctly with an account', () => {
    const votes = new Map<Address, VoteStatusEnum>();
    votes.set(dummyAddress(1), VoteStatusEnum.Accept);
    votes.set(dummyAddress(2), VoteStatusEnum.Pending)
    const component = renderer.create(
        <VoteStatus
            account={dummyAccount(2)}
            candidateStatuses={[
                {
                    candidate: dummyAddress(0),
                    votes
                }
            ]}
        />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})