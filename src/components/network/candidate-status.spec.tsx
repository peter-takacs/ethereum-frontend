
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { dummyAddress } from '../../utils/test/address';
import CandidateStatus from './candidate-status';
import { VoteStatus as VoteStatusEnum } from '../../types/vote' ;
import { Address } from '../../types/ethereum-address';

test('Renders correctly with no data', () => {
    const component = renderer.create(
            <CandidateStatus
                onAccept={() => {}}
                onReject={() => {}}
                address={null}
                candidate={null}
                votes={new Map<Address, VoteStatusEnum>()} 
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
});

test('Renders correctly with data', () => {
    const votes = new Map<Address, VoteStatusEnum>();
    votes.set(dummyAddress(1), VoteStatusEnum.Accept);
    const component = renderer.create(
        <CandidateStatus
            onAccept={() => {}}
            onReject={() => {}}
            address={null}
            candidate={dummyAddress(0)}
            votes={votes}
        />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Renders correctly with an address', () => {
    const votes = new Map<Address, VoteStatusEnum>();
    votes.set(dummyAddress(1), VoteStatusEnum.Accept);
    votes.set(dummyAddress(2), VoteStatusEnum.Pending);
    const component = renderer.create(
        <CandidateStatus
            onAccept={() => {}}
            onReject={() => {}}
            address={dummyAddress(2)}
            candidate={dummyAddress(0)}
            votes={votes}
        />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})