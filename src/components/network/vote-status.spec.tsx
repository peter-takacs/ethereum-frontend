
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { dummyAddress } from '../../utils/test/address';
import VoteStatus from './vote-status';
import { VoteStatus as VoteStatusEnum } from '../../types/vote' ;
import { Address } from '../../types/ethereum-address';

test('Renders correctly with no data', () => {
    const component = renderer.create(
            <VoteStatus
                candidateStatuses={[]}
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