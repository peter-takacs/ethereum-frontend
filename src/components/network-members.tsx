import * as React from 'react';
import { NetworkMembersState } from '../state/educator-network';

export interface NetworkMembersProps extends NetworkMembersState {}

const NetworkMembers = ({members}: NetworkMembersState) => (
    <div>
        <header>
            Educator network members:
        </header>
        <ul>
            {members.map(member => (
                <li key={member.toString()}>{member.toString()}</li>
            ))}
        </ul>
    </div>
)

export default NetworkMembers;