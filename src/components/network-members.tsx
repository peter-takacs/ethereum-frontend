import * as React from 'react';
import { State } from '../state/educator-network';

export interface NetworkMembersProps extends State {}

const NetworkMembers = ({members}: State) => (
    <div>
        <header>
            Educator network members:
        </header>
        <ul>
            {members.map(member => (
                <li key={member}>{member}</li>
            ))}
        </ul>
    </div>
)

export default NetworkMembers;